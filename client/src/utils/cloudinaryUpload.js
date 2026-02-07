const uploadResumeToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "riseup_resumes");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dl05ueoc0/raw/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await response.json();
  return data.secure_url;
};

export default uploadResumeToCloudinary;
