"use client";

import Script from "next/script";
import type { CozeProps } from "../lib/props";
import { cozeWebSDK } from "../lib/config";

export default function CozeBot({
  botId,
  title,
  icon,

  lang = "zh-CN",
  height = "80%",
  bottom = "10px",
  right = "10px",
}: CozeProps) {
  
  const inlineStyles = `
    #coze_bot_position > div:has(> iframe) {
      height: ${height};
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }}></style>
      <div
        id="coze_bot_position"
        style={{
          position: "fixed",
          bottom: bottom,
          right: right,
        }}
      ></div>
      <Script
        src={cozeWebSDK}
        onLoad={() => {
          if (!botId) {
            console.error("no botId");
            return;
          }

          // @ts-ignore
          new CozeWebSDK.WebChatClient({
            config: {
              bot_id: botId,
            },

            componentProps: {
              title: title,
              icon: icon,
              lang: lang,
            },
            el: document.getElementById("coze_bot_position"),
          });
        }}
      />
    </>
  );
}
