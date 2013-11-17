if( !AdrianSux )
  console.error( "AdrianSux must be part of the global scope prior to calling this" );

//Generates https://github.com/admc/wd
;( function( window, document, undefined ) {
                         
  var _newHistory = [ ],
      _history = null,
      _foxuedEvent = null,
      _inputValue = "";

  var eachDo = function( collection, callback ) {
    for( var i in collection )
      if( collection.hasOwnProperty( i ) )
        callback( collection[ i ], i );
  };

  var mapEvent = function( type ) {

    click: "clickElementByXPath",  
    scroll: "scrollTo",
    keydown: "",
    focusout: "type",
    focusin: "elementByXPath"
  };

  var translateEvent = function( e ) {
    if( e.type === "focusin" ) {
      _focusedEvent = e;
      return mapEvent[ e.type ] 
    }
    else if( e.type === "focusout" ) {
      return eventMapping[ e.type ] + "(" + e.xpath + ")";

      _focusedEvent = null;
      _inputValue = "";
    }
    if( e.type === "keydown" ) {
      if( _focusedEvent ) 
        _inputValue += String.fromCharCode( e.keyCode );
    }
    else if( e.type === "scroll" ) {
    }
  };

  var prep = function( events ) {
    eachDo( events, coalesceEvents );
  };

  var coaelesceEvents = function( e, i ) {
    if( e.type === "keydown" ) {

    }
  };

  AdrianSux.prototype.generateWebDriverJS = function( wrapCommand ) {
    var _history = this.getHistory( );
    prep( _history );
  };

} )( window, document, undefined );
