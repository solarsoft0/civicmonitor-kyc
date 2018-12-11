import React from "react";
import { InlineReactionButtons } from "sharethis-reactjs";
import { InlineShareButtons } from "sharethis-reactjs";
import { StickyShareButtons } from "sharethis-reactjs";
import { InlineFollowButtons } from "sharethis-reactjs";

class Share extends React.Component {
  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html, body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          hr {
            margin-bottom: 40px;
            margin-top: 40px;
            width: 50%;
          }
        `
          }}
        />

        <StickyShareButtons
          config={
            {
              alignment: "left",
              enabled: true,
              font_size: 16,
              hide_desktop: false,
              labels: "counts",
              language: "en",
              min_count: 0,
              networks: [
                // which networks to include (see SHARING NETWORKS) // alignment of buttons (left, right) // show/hide buttons (true, false) // font size for the buttons // hide buttons on desktop (true, false) // button labels (cta, counts, null) // which language to use (see LANGUAGES) // hide react counts less than min_count (INTEGER)
                "linkedin",
                "facebook",
                "twitter",
                "pinterest",
                "email"
              ],
              padding: 12,
              radius: 4,
              show_total: true,
              show_mobile: true,
              show_toggle: true,
              size: 48,
              top: 160, // OPTIONAL PARAMETERS // padding within buttons (INTEGER) // the corner radius on each button (INTEGER) // show/hide the total share count (true, false) // show/hide the buttons on mobile (true, false) // show/hide the toggle buttons (true, false) // the size of each button (INTEGER) // offset in pixels from the top of the page
              image:
                "https://res.cloudinary.com/civic-monitor/image/upload/v1543350730/logo.png",
              description:
                "Get the Information you need to make the right decision Your vote is your voice.",
              title: "Know Your Candidate",
              message:
                "Get the Information you need to make the right decision Your vote is your voice.",
              subject: "Know Your Candidate",
              username: "civicmonitor"
            } // (defaults to og:image or twitter:image) // (defaults to og:description or twitter:description) // (defaults to og:title or twitter:title) // (defaults to og:description or twitter:description) // (only for twitter sharing)
          }
        />
      </div>
    );
  }
}

// export
export default Share;
