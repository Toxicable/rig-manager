#!/bin/bash
cd /dev/disk/by-label
for label in *
do
    partition=$(basename $(readlink $label))
    sudo mkdir ~/mining/drives/$label
    sudo mount /dev/$partition ~/mining/drives/$label
done
exit

