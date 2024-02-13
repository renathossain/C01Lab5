const SERVER_URL = "http://localhost:4000";

async function postNoteHelper(title, content) {
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  return { postNoteRes, postNoteBody };
}

async function deleteNoteHelper(noteId) {
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
  });

  const deleteNoteBody = await deleteNoteRes.json();

  return { deleteNoteRes, deleteNoteBody };
}

async function getAllNotesHelper() {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET"
  });

  const getAllNotesBody = await getAllNotesRes.json();

  return { getAllNotesRes, getAllNotesBody };
}

test("/postNote - Post a note", async () => {
  const { postNoteRes, postNoteBody } = await postNoteHelper(
    "NoteTitleTest", "NoteTitleContent"
  );

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  
  // Cleanup
  deleteNoteHelper(postNoteBody.insertedId);
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const { getAllNotesRes, getAllNotesBody } = await getAllNotesHelper();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  await postNoteHelper( "NoteTitleTest1", "NoteTitleContent1" );
  await postNoteHelper( "NoteTitleTest2", "NoteTitleContent2" );

  const { getAllNotesRes, getAllNotesBody } = await getAllNotesHelper();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response.length).toBe(2);
  expect(getAllNotesBody.response[0].title).toBe("NoteTitleTest1");
  expect(getAllNotesBody.response[1].title).toBe("NoteTitleTest2");
  expect(getAllNotesBody.response[0].content).toBe("NoteTitleContent1");
  expect(getAllNotesBody.response[1].content).toBe("NoteTitleContent2");

  // Cleanup
  await deleteNoteHelper(getAllNotesBody.response[0]._id);
  await deleteNoteHelper(getAllNotesBody.response[1]._id);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  expect(false).toBe(true);
});