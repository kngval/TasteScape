{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
 packages =[
  pkgs.nodejs_21
 ];

  # Sets environment variables in the workspace
  env = {
    PORT = 3000;
    MONGO_URI = "mongodb+srv://kngval:kngvaljavascript21@tastescape.imeeypd.mongodb.net/?retryWrites=true&w=majority";
    API_KEY="e2af5c6d5b774fdcbe4ad7ad852099d8";
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    # "angular.ng-template
    "bradlc.vscode-tailwindcss"
    "humao.rest-client"
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        cwd="/home/user/TasteScape/client";
        manager = "web";
        id = "web";
      }
      {
        id="ios";
        manager="ios";
      }
    ];
  };
}