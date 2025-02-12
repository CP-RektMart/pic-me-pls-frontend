'use server'

import { auth } from '@/auth'
import { ServerResponse } from '@/type/server'

async function convertStringToFile(inputString: string): Promise<File> {
  let filename = 'file'; // Default filename
  let fileType = 'application/octet-stream'; // Default MIME type for unknown files

  if (inputString.startsWith('data:')) {
    // It's a Base64 string, extract filename based on MIME type
    filename = extractFileNameFromBase64(inputString, fileType);
    return base64ToFile(inputString, filename, fileType);
  } else {
    // It's a URL or invalid Base64, return an empty File
    return new File([], filename, { type: 'application/octet-stream' });
  }
}

function base64ToFile(base64String: string, filename: string, fileType: string): File {
  const base64 = base64String.split(',')[1]; // Remove the "data:image/png;base64," part if present
  const binaryString = atob(base64); // Decode Base64 to binary string
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    uintArray[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([uintArray], { type: fileType }); // Adjust MIME type based on your content
  return new File([blob], filename, { type: fileType });
}


function extractFileNameFromBase64(base64String: string, defaultFileType: string): string {
  const mimeTypeMatch = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-+]+)(;.*)?$/);
  
  if (mimeTypeMatch) {
    const mimeType = mimeTypeMatch[1];
    let extension = '';

    // Determine file extension and MIME type
    if (mimeType === 'image/jpeg') {
      extension = '.jpeg';
    } else if (mimeType === 'image/jpg') {
      extension = '.jpg';
    } else if (mimeType === 'image/png') {
      extension = '.png';
    } else {
      extension = '.txt';
    }

    return `profile${extension}`;
  }
  
  return 'profile.txt';
}

interface formData {
    citizenId: string
    laserId: string
    picture: string
    expiredDate: Date
    terms: boolean
}

export default async function createCitizenCard(
  formData: formData
): Promise<ServerResponse<string | null>> {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return {
        result: null,
        error: 'Failed to authenticate',
      }
    }

    const picture = await convertStringToFile(formData.picture)
    const formDataBody = new FormData();
    formDataBody.append("citizenId", formData.citizenId);
    formDataBody.append("laserId", formData.laserId);
    formDataBody.append("expireDate", formData.expiredDate.toISOString());
    formDataBody.append("cardPicture", picture);

    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/photographer/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formDataBody,
    })
    
    const data = await res.json()

    return data
  } catch (err) {
    console.log(err)

    return {
      result: null,
      error: 'Failed to update user profile',
    }
  }
}
