import { directory, file } from "./file_structs";

class file_system {
  home: directory;
  current: directory;

  constructor() {
    this.home = {
      name: "home",
      parent: null,
      files: [],
      children: [],
      modifiable: false,
      path: "~/",
    };
    this.current = this.home;
    this.init_dir("projects", this.home.path);
    this.init_dir("documents", this.home.path);
  }

  init_dir(name, path) {
    this.create_dir(name, path, false);
  }

  traverse_path(path: string): directory {
    const path_list = path.split("/");
    let parent = this.home;
    for (let i = 0; i < path_list.length - 1; i++) {
      const name = path_list[i];
      const child = parent.children.find((child) => child.name == name);
      if (child == undefined) {
        throw new Error("Path does not exist");
      }
      parent = child;
    }
    return parent;
  }

  create_dir(name, path, modifiable = true) {
    const parent = this.traverse_path(path);
    if (modifiable && !parent.modifiable) {
      throw new Error("Parent directory is unmodifiable");
    }
    if (parent.children.find((child) => child.name == name) != undefined) {
      throw new Error("Directory already exists");
    }
    const new_dir = {
      name: name,
      parent: parent,
      files: [],
      children: [],
      modifiable: modifiable,
      path: path + name + "/",
    };
    parent.children.push(new_dir);
  }

  remove_dir(path, flags: string[] = []) {
    const dir = this.traverse_path(path);
    const parent = dir.parent;
    if (!dir.modifiable || parent === null) {
      throw new Error("Directory is unmodifiable");
    }
    if (dir.children.length > 0 && !flags.includes("r")) {
      throw new Error("Directory is not empty");
    }
    parent.children = parent.children.filter((child) => child != dir);
  }




}

