const cloudinary = require("cloudinary").v2;
const router = require("express").Router();

async function uploadFileToCloudinary(file, folder, name, quality) {
  const options = { folder, public_id: name };

  if (quality) options.quality = quality;

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

router.post("/", async (req, res) => {
  try {
    const file = req.files.imageFile;

    //validation
    // const supportedTypes = ["jpg", "png", "jpeg"];

    // const fileType = file.name.split(".")[1].toLowerCase();
    // // console.log(fileType);
    // if (!supportedTypes.includes(fileType)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "File format not supported",
    //   });
    // }

    //file supported
    const folder = `Socialify/${req.body.folder}`;
    const name = req.body.name;
    const response = await uploadFileToCloudinary(file, folder, name);

    res.status(200).json({
      message: "Image uploaded to cloudinary",
      image: response.secure_url,
    });
  } catch (err) {
    console.log("Error in image Upload", err);
    res.status(403).json({ msg: "Error in Image Upload" });
  }
});

module.exports = router;
