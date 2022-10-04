const Router = require("express");
const router = new Router();
const Image = require("../models/Image");
// const fileController = require("../controllers/fileController");

// router.post('', async (req, res)=> {
// 	try {
// 			const {name, type, parent} = req.body
// 			const file = new File({name, type, parent})
// 			const parentFile = await File.findOne({_id: parent})
// 			if(!parentFile) {
// 					file.path = name
// 					await fileService.createDir(file)
// 			} else {
// 					file.path = `${parentFile.path}\\${file.name}`
// 					await fileService.createDir(file)
// 					parentFile.childs.push(file._id)
// 					await parentFile.save()
// 			}
// 			await file.save()
// 			return res.json(file)
// 	} catch (e) {
// 			console.log(e)
// 			return res.status(400).json(e)
// 	}
// })
router.post("/kg", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "Файл не был загружен" });
    }
    const path = `${__dirname}/../../client/public/img/coffeeItems/`;
    const file = req.files.file;
    newFileName = Date.now() + "." + file.name.split(".")[1];
    file.mv(path + "kg/" + newFileName);
    const newImage = await Image.create({
      name: newFileName,
      path,
    });
    res.status(201).send(newImage);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
// router.get('', fileController.getFiles)

module.exports = router;
