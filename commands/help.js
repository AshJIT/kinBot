// yes the indenting is bad, need to reformat later
module.exports = {
  getHelp: function(arguments, receivedMessage) {
    receivedMessage.channel.send(
      `Trying to showcase your kin?
Try: **/kin** kin name

If your kin is a Totoma that's currently unnamed
Try: **/kinslug** kin-slug

Or maybe you're looking to see how many kin you own
Try: **/user** username

Maybe you want to see how two kin look together?
Try: **/ship** kin name & kin name

If you want to look at random kin pairs (I take no responsibility for bleeding eyes)...
Try: **/shiprandom**`
    );
  }
};
