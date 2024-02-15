const fetch = require("node-fetch");

test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

afterEach(async () => {
    await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
});

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

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

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // Code here
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

    const getAllNotesBody = await getAllNotesRes.json();
    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(0);
    expect(getAllNotesBody.response).toEqual([]);

  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    for(let i = 0; i < 2; i++) {
        await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title+i,
            content: content+i,
            }),
        });
    }

    // Code here
    const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

    const getAllNotesBody = await getAllNotesRes.json();
    expect(getAllNotesRes.status).toBe(200);
    expect(getAllNotesBody.response.length).toBe(2);

  });
  
  test("/deleteNote - Delete a note", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

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

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);
    expect(deleteNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} deleted.`);
  });
  
  test("/patchNote - Patch with content and title", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

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

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: 'updatedTitle',
        content: 'updatedContent',
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/patchNote - Patch with just title", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

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

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: 'updatedTitle',
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);

  });
  
  test("/patchNote - Patch with just content", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

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

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        content: 'updatedContent',
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
    const deleteAllNotesBody = await deleteAllNotesRes.json();
    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toEqual('1 note(s) deleted.');
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    for(let i = 0; i < 3; i++) {
        await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title+i,
            content: content+i,
            }),
        });
    }

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
    const deleteAllNotesBody = await deleteAllNotesRes.json();
    expect(deleteAllNotesRes.status).toBe(200);
    expect(deleteAllNotesBody.response).toEqual('3 note(s) deleted.');
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

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

    const updateNoteColourRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: '#FF0000'
        }),
    });

    const updateNoteColourBody = await updateNoteColourRes.json();

    expect(updateNoteColourRes.status).toBe(200);
    expect(updateNoteColourBody.message).toEqual(`Note color updated successfully.`);
  });