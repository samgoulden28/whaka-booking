import { addBookingApi } from "@/utilities/server/form";

export async function GET(request: Request) {
  return new Response(JSON.stringify({ hello: "sam" }), { status: 200 });
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { accomodationId, name, numPeople, peopleNames } =
      await request.json();

    // Validate email and password (you can add more robust validation)
    if (!accomodationId || !name || !numPeople) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const result = await addBookingApi({
      accomodationId,
      name,
      numPeople,
      peopleNames,
    });

    // Respond with the created user or a success message
    return new Response(JSON.stringify({ accomodationId }), { status: 200 });
  } catch (error) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
