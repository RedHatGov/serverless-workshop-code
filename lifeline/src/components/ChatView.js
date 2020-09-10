// author: @dudash
// license: Apache 2.0
import React from "react";
import { observer } from "mobx-react";

function ChatView({ stateStore }) {    
    return (
        <div>
            Chat is currently unavailable - please continue to use text messaging
        </div>
    );
}
export default observer(ChatView);