{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
 packages =[
  pkgs.nodejs_21
 ];

  # Sets environment variables in the workspace
  env = {
    SOME_ENV_VAR = "hello";
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    # "angular.ng-template
    "bradlc.vscode-tailwindcss"
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