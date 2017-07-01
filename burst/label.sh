#!/bin/bash
echo -e "g\nn\n\n\n\nw" | sudo fdisk /dev/$1
sudo mkfs.ext4 /dev/$11
sudo e2label /dev/$11 $2
