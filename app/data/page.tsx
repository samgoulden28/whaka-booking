import { S3_PROD_IMAGES_URL, createS3ImageUrl } from '@/utilities/client/aws';
import { getItemByHeaderName } from '@/utilities/client/sheets';
import { getGoogleSheetsData } from '@/utilities/server/sheets';
import Image from 'next/image'

export default async function Home() {
  const range = `${process.env.NEXT_PUBLIC_SHEET_NAME}!${process.env.NEXT_PUBLIC_SHEET_RANGE}`;
  const sheet = await getGoogleSheetsData(range);
  const [headers, ...rest] = Array.isArray(sheet) ? sheet : [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* tailwind table */}
      <table className="table-auto">
        <thead>
          <tr>
            {headers?.map((row, index) => (
              <th key={index} className="px-4 py-2">
                {row}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rest?.map((row, index) => {
            return (
              <tr key={index}>
                {row?.map((cell, index) => {
                  if(headers[index] === 's3Images') {
                    const imageNames = JSON.parse(cell);
                    const imageFolder = getItemByHeaderName('s3FolderName', headers, row)
                    return <td key={index} className="border px-4 py-2">

                    {imageNames.map((imageName, index) => {
                      const image = createS3ImageUrl(S3_PROD_IMAGES_URL, imageFolder, imageName);
                      // flex
                      return <img key={index} src={image} alt={`${imageFolder}/${imageName}`}/>;
                    })}
                    </td>
                  }
                  return (
                    <td key={index} className="border px-4 py-2">
                      {cell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
