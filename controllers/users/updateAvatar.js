const { userModel } = require('../../models/user');
const path = require('path');
const asyncHandler = require("express-async-handler");
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const avatarImgResize = await Jimp.read(tempUpload);
    await avatarImgResize.resize(250, 250).write(resultUpload);
    
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await userModel.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL })
});

module.exports = updateAvatar;