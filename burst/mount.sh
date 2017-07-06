#!/bin/bash
cd /dev/disk/by-label
sudo mkdir ~/drives
for label in *
do
    partition=$(basename $(readlink $label))
    sudo mkdir ~/drives/$label
    sudo mount /dev/$partition ~/drives/$label
done
exit

