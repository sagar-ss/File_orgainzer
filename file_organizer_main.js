console.log("hello beginners😍");

let path = require("path");
let fs = require("fs");

let type = {

    program: ['js','cpp','c','java'],
    video: ["mp4", "mkv"],

    document: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'jpg', 'png'],

    archives: ['zip', 'rar', '7z', 'tar', 'gz', 'ar', 'iso', 'xz'],

    app: ['exe', 'dmg', 'pkg', 'deb']

}

// INPUT -> we take input in array in which 0th index is stored with node and 1st index is stored with name of file.

// process.argv[2] -> for taking input 

let input_arr = process.argv.slice(2);
// console.log(input_arr);

let command = input_arr[0];



switch (command) {
    case "tree":
        treeFn(input_arr[1])




        break;

    case "organize":

        organizeFn(input_arr[1]);


        break;

    case "help":

        helpFn();


        break;

    default:
        console.log("enter valid command");



}

function treeFn(dir_path) {
    console.log("tree implemented");

}

function organizeFn(dir_path) {

    if (dir_path == undefined) {
        console.log("enter destination path");
        return;
    }

    //1. check for dir_path whether it is valid or not  and then create organize directory if it is not already created

    let does_dir_exist = fs.existsSync(dir_path);
    if (does_dir_exist) {
        let check_organize_file = path.join(dir_path, "organize_files");

        if (fs.existsSync(check_organize_file) == false) {
            fs.mkdirSync(check_organize_file);
        }

        let file_arr = fs.readdirSync(dir_path);

        for (let i = 0; i < file_arr.length; i++) {

            let child_address = path.join(dir_path, file_arr[i]);

            // console.log(child_address);

            if (fs.lstatSync(child_address).isFile()) {
                let category = category_check(child_address, dir_path);

                console.log(file_arr[i], " belogs to -> ", category);

                let folder = path.join(dir_path, "organize_files", category);

                //console.log("folder->",folder);
                //  console.log(fs.existsSync(folder));
                if (fs.existsSync(folder) == false) {

                    fs.mkdirSync(folder);
                }
                folder = path.join(folder, path.basename(child_address));

                fs.copyFileSync(child_address, folder);
                fs.unlinkSync(child_address);


            }

        }

    }


}

function helpFn() {
    console.log(`

      for tree->  node main.js tree directory_path

      for organize-> node main.js organize directory_path

      for help->  node main.js help

    `)
}

function category_check(child_address, dir_path) {
    let ext = path.extname(child_address);
    ext = ext.slice(1);

    console.log(ext);

    for (let i in type) {

        for (let j = 0; j < type[i].length; j++) {
            console.log(type[i][j]);
            if (type[i][j] == ext) {
                //console.log(i);
                return i;
            }
        }
    }

    return "others";

}

