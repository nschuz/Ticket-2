const getImageProfile = async(email) => {
    const filePath = path.join(__dirname, '../', 'images');
    console.log(path.extname(filePath));
    console.log(email);
    let bandera = false;

    await fs.readdir(filePath, async(err, files) => {
        await files.forEach(file => {
            console.log("file", file);
            console.log(file.startsWith(email));
            if (file.startsWith(email)) {
                bandera = true;
                const img = path.join(filePath, file);
                console.log("img:", img);
                return img
            }
        });
        if (!bandera) {
            return "Imagen No encontrada";
        }
    });
}

module.exports = {
    getImageProfile
}