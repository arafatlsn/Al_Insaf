export const uploadFunction = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "e2zyh8qj");
  const url = `https://api.cloudinary.com/v1_1/lsncloud/image/upload`;

  try {
    const result = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return { status: 200, result: result };
  } catch (error) {
    return { status: 400, error };
  }
};
