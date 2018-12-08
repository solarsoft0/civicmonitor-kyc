import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
 
class Comment extends React.Component {
  handleNewComment(comment) {
    console.log(comment.text);
  }

  
 
  render() {
    return (
      <ReactDisqusComments
        shortname="civicmonitor"
        identifier="PAGE_IDENTIFIER"
        title="Civicmonitor"
        url="http://civicmonitor.com"
        category_id="123456"
        onNewComment={this.handleNewComment}/>
    );   
  }
}
 
export default Comment;