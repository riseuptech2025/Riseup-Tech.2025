const uploadResumeToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "riseup_resumes"); // must match the preset you created

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dl05ueoc0/raw/upload", // make sure cloud name is correct
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message); // show real Cloudinary error
  }

  return data.secure_url;
};
