#!/bin/bash

if ! command -v git &> /dev/null; then
    echo "Error: git is not installed."
    exit 1
fi

folders=("hw-1" "hw-2" "hw-3" "hw-4" "hw-5" "hw-7" "hw-8" "hw-9" "hw-10" "hw-11" "hw-12" "hw-13" "hw-14" "hw-15" "hw-16" "hw-17" "hw-18")

select_option() {
    local selected=0
    local options=("$@")
    local num_options=${#options[@]}

    tput civis
    
    while true; do
        for i in "${!options[@]}"; do
            if [ $i -eq $selected ]; then
                echo -e "\e[1;32m> ${options[$i]}\e[0m"
            else
                echo "  ${options[$i]}"
            fi
        done

        read -rsn3 key
        
        for ((i=0; i<num_options; i++)); do
            tput cuu1
            tput el
        done

        case "$key" in
            $'\x1b[A')
                ((selected--))
                if [ $selected -lt 0 ]; then selected=$((num_options - 1)); fi
                ;;
            $'\x1b[B')
                ((selected++))
                if [ $selected -ge $num_options ]; then selected=0; fi
                ;;
            "")
                break
                ;;
        esac
    done

    tput cnorm
    return $selected
}

echo "Select a folder to clone (use ↑/↓ arrows and Enter):"
select_option "${folders[@]}"
choice_idx=$?
folder_name=${folders[$choice_idx]}

new_dir="mus-${folder_name}"
repo_url="https://github.com/musdev13/react-hws.git"

echo -e "\nSetting up folder \e[1;34m$new_dir\e[0m..."

mkdir -p "$new_dir"
cd "$new_dir" || exit 1

git init -q
git remote add origin "$repo_url"
git sparse-checkout init --cone
git sparse-checkout set "$folder_name"

echo "Downloading files from repository..."
git pull origin main --quiet 2>/dev/null || git pull origin master --quiet

if [ -d "$folder_name" ]; then
    shopt -s dotglob
    mv "$folder_name"/* . 2>/dev/null
    shopt -u dotglob
    rmdir "$folder_name"
    echo "Files downloaded successfully."
else
    echo "Error: Failed to download files. Check the branch name or connection."
    exit 1
fi

rm "clone-hw.sh"

if [ -f "package.json" ]; then
    echo "Running npm install..."
    npm i
else
    echo "package.json not found, skipping npm install."
fi

echo "------------------------------------------------"
echo -e "\e[1;32mFolder $new_dir has been successfully cloned!\e[0m"
echo ""
echo "now type:"
echo -e "\e[1;33mcd $new_dir\e[0m"
echo -e "\e[1;33mnpm run dev\e[0m"
echo "------------------------------------------------"
