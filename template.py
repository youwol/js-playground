import shutil
from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import (
    Template,
    PackageType,
    Dependencies,
    RunTimeDeps,
    generate_template,
    DevServer,
    Bundles,
    MainModule,
)
from youwol.utils import parse_json

folder_path = Path(__file__).parent

pkg_json = parse_json(folder_path / "package.json")

externals = {
    "@youwol/webpm-client": "^3.0.0",
    "@youwol/rx-vdom": "^1.0.1",
    "@youwol/rx-code-mirror-editors": "^0.5.0",
    "rxjs": "^7.5.6",
    "@youwol/http-clients": "^3.0.0",
    "@youwol/http-primitives": "^0.2.0",
    "@youwol/os-top-banner": "^0.2.0",
}

template = Template(
    path=folder_path,
    type=PackageType.APPLICATION,
    name=pkg_json["name"],
    version=pkg_json["version"],
    shortDescription=pkg_json["description"],
    author=pkg_json["author"],
    dependencies=Dependencies(
        runTime=RunTimeDeps(externals=externals),
        devTime={"lz-string": "^1.5.0"}
    ),
    bundles=Bundles(
        mainModule=MainModule(
            entryFile="./main.ts", loadDependencies=list(externals.keys())
        )
    ),
    userGuide=True,
    devServer=DevServer(port=3018),
)

generate_template(template)
shutil.copyfile(
    src=folder_path / ".template" / "src" / "auto-generated.ts",
    dst=folder_path / "src" / "auto-generated.ts",
)
for file in [
    "README.md",
    ".gitignore",
    ".npmignore",
    ".prettierignore",
    "LICENSE",
    "package.json",
    "tsconfig.json",
    "webpack.config.ts",
]:
    shutil.copyfile(src=folder_path / ".template" / file, dst=folder_path / file)
