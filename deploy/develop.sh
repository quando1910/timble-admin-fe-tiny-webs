# echo "start building"
# ssh -o "StrictHostKeyChecking no" deploy@theclassic.studio
# echo ${CIRCLE_TAG}
# mkdir /abc

# echo "success!"

#!/bin/bash
npm install
npm run build

scp -r -o StrictHostKeyChecking=no dist/* deploy@theclassic.studio:/var/www/dev.theclassic.studio

# set -e
#   reset="\033[0m"
#   red="\033[31m"
#   green="\033[32m"
#   yellow="\033[33m"
#   cyan="\033[36m"
#   white="\033[37m"
#   BUILD_ENV=""
#   ENV_NAME=""
#   password=""
#   version=""
#   SUDO=""
#   PUBLIC_HTML="/var/www/dev.theclassic.studio/"
#   SOURCE_DIR="~/briliant-moment"

# cd $SOURCE_DIR
# printf "$yellow> Clean up build artifacts...$reset\n"
# rm -rdf dist

# printf "$cyan> Checking files changed...$reset\n"
# git status

# printf "$yellow> Reset files changed before fetching:$yellow\n"
# git checkout .

# printf "$cyan> Checking for new release...$reset\n"
# git fetch -q --tags

# git checkout tags/${CIRCLE_TAG}

# printf "$cyan> Starting build process...$reset\n"
# # echo $password | $SUDO npm run reinstall && npm run build.$BUILD_ENV
# # npm install && npm run build.$BUILD_ENV

# printf "$green> Version $version build successful!$reset\n"

# printf "$yellow> Removing old code...\n"
# rm -rf $PUBLIC_HTML*

# printf "$cyan> Moving new app to root folder...\n"
# mv ~/$SOURCE_DIR/dist/* $PUBLIC_HTML

# printf "${cyan}tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
# printf "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..............................................\n"
# printf "aaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaa..............................................\n"
# printf "aaaaaaaaaaaaaaaa    aaaaaa   aaaaaaaaaaaaaaa..............................................\n"
# printf "aaaaaaaaaaaaaaaa   aaaaaaa   aaaaaaaaaaaaaaa........                      ................\n"
# printf "aaaaaaaaaaaaaaaa    aaaaaa   aaaaaaaaaaaaaaa........  ffffffff . eeeeeee  ................\n"
# printf "aaaaaaaaaaaaaaaaaa    aaa    aaa aaaaaaaaaaa........  fff     .. eee      ................\n"
# printf "aaaaaaaaaaaaaaaaaaaaaaaaaaaa  a   tttttttttt........  fffffff  . eeeeeee  ................\n"
# printf "ttttttttttttttttttttttttttttttt   tttttttttt........  fff   .... eee      ................\n"
# printf "tttttttttttttttttttttttttttttt        tttttt........  fff   .... eeeeeee  ................\n"
# printf "ttttttttttttttttttttttttttttttt   tttttttttt........                      ................\n"
# printf "ttttttttttttttttttttttttttttttt   ttt  ttttt..............................................\n"
# printf "ttttttttttttttttttttttttttttttttt   tttttttt..............................................\n"
# printf "tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
# printf "tttttttttttttttttttttttttttttttttttttttttttt..............................................\n"
# printf "${reset}                                                                                  \n"
# printf "Completed" 
