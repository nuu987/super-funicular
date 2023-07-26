import fs from 'fs';

const custom_lives_raw = "https://ghproxy.com/raw.githubusercontent.com/nuu987/super-funicular/main/watch";
const custom_lives_encoded = "proxy://do=live&type=txt&ext=aHR0cHM6Ly9naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vbnV1OTg3L3N1cGVyLWZ1bmljdWxhci9tYWluL3dhdGNo";

fs.readFile('./if.json',
    (err, data) => {
        const if_full_data = JSON.parse(data);
        const all_sites_data = if_full_data.sites;
        const lives_data = if_full_data.lives;

        (function () {
            var new_sites_data = all_sites_data.filter((ele) => {
                return !/磁力|课堂|关注|体育|球|搜索|直播|墙|教育|少儿|小说|收音|官源|聚合|哔|玩偶/.test(ele.name);
            })

            lives_data.forEach(element => {
                if (element.name === "live") {
                    // console.log(element);
                    element.url = custom_lives_raw;
                } else if (element.group === "redirect") {
                    // console.log(element);
                    element.channels[0].urls[0] = custom_lives_encoded
                } else
                    console.log("can not find valid lives data, bad if? no replacement performed!")
            });

            if_full_data.sites = new_sites_data;
            if_full_data.lives = lives_data;

            if_full_data.warningText = "更新时间：" + new Date().toLocaleString()

            fs.writeFile('../if.json', JSON.stringify(if_full_data, null, 1), (err) => {if (err) {throw err}});
        })()
    }
)