const File = require('../models/files');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded or invalid file type',
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
      });
    }

    const fileData = {
      filename: req.file.key,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      location: req.file.location,
      key: req.file.key
    };

    const file = new File(fileData);
    await file.save();

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        url: file.location,
        createdAt: file.createdAt
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Duplicate key', details: 'Try again with a new file name' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed', details: error.message });
    }
    res.status(500).json({ error: 'Upload failed', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const files = await File.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const total = await File.countDocuments();

    res.json({
      success: true,
      data: files.map(file => ({
        id: file._id,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        url: file.location,
        createdAt: file.createdAt
      })),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch files', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};
