{ pkgs, ... }:
{
  # Enable MongoDB
  services.mongodb.enable = true;

  # rest of your config
  # ...
}