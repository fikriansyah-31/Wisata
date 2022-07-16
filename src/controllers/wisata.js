const { wisata } = require('../../models')

exports.addWisata = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            lokasi: req.body.lokasi,
            photo: req.files.photo[0].filename,
            streetview: req.body.streetview,
        };
        console.log(req.file);

        let newWisata = await wisata.create(data);

        let wisataData = await wisata.findOne({
            where: {
                id: newWisata.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        wisataData = JSON.parse(JSON.stringify(wisataData))

        res.send({
            status: "success",
            data: {
                wisata: {
                    ...wisataData,
                    Wisata: process.env.FILE_PATH_IMAGE
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
};

exports.getWisatas = async (req, res) => {
    try {
        let wisataData = await wisata.findAll({
            
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            
        });

        wisataData = JSON.parse(JSON.stringify(wisataData))
        wisataData = wisataData.map((item) => {
            return {
                ...item,
                wisata: process.env.FILE_PATH_IMAGE + item.photo
            }
        })

        res.send({
            status: "success",
            data: {
                wisata: wisataData,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
};
