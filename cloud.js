const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dlkbsezjx', 
    api_key: '969861458332956', 
    api_secret: 'sw6KnAD9l0Fnwi1GvRMU0kdB_ng' // Click 'View API Keys' above to copy your API secret
});

// Create Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tripNest", // Change folder name as needed
    format: async (req, file) => "png", // Convert images to PNG
    public_id: (req, file) => file.originalname.split(".")[0] + "-" + Date.now(), // Unique filename
  },
});

const upload = multer({ storage });

module.exports = { upload };

