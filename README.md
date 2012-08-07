BootPrompt
==========

Creates a bootstrap modal wrapped in a backbone view.

##Options
width - Set the width of the modal.
title - Set the title of the modal.
content - Text/html for the body of the modal.
ok/cancel - Called when the user presses the ok/cancel button. 
  *`return true` to close the modal
  *`return false` to keep the modal open. (Useful for validation)


##Options Example
<pre>
{
width: 500,
title: "Text",
content: 'body text or dom element for body',
ok: function($el, e) { return true; },
cancel: function($el, e) { return true; }
}
</pre>