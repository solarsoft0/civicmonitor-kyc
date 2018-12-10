import React from 'react';
import Disqus from 'disqus-react';
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount } from 'disqus-react';

class Comment extends React.Component {
    render() {
        const disqusShortname = 'civicmonitor';
        const disqusConfig = {
            url: "http://civicmonitor.com",
            identifier:' PAGE_IDENTIFIER',
            title: 'civicMonitor',
        };

        return (
            <div className="article">
                
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount>
               
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </div>
        );
    }
}

export default Comment;