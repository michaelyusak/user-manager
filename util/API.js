import { dateOfInputGenerator } from "./DateConverter";

async function HandleGet(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch all user");
  }

  const responseData = response.json();

  return responseData;
}

async function HandlePost(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Failed to post a user");
  }
}

async function HandleDelete(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete a user");
  }
}

async function HandlePut(url, payload) {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }
}

export async function GetAllUser() {
  const url = "http://localhost:3000/users";

  const data = await HandleGet(url);

  return data;
}

export async function PostOneUser(name, address, gender, dob) {
  const url = "http://localhost:3000/users";
  const payload = JSON.stringify({
    name: name,
    address: address,
    gender: gender,
    dob: dob,
    doi: dateOfInputGenerator(),
  });

  HandlePost(url, payload);
}

export async function DeleteOneUser(id) {
  const url = `http://localhost:3000/users/${id}`;

  HandleDelete(url);
}

export async function PutOneUser(id, name, address, gender, dob) {
  const url = `http://localhost:3000/users/${id}`;
  const payload = JSON.stringify({
    name: name,
    address: address,
    gender: gender,
    dob: dob,
    doi: dateOfInputGenerator(),
  });

  HandlePut(url, payload);
}
