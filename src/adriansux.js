var AdrianSux = { };

;( function( window, document, undefined ) {
                         
  AdrianSux = function( ) {
    var 
        self = null,
        _history = [ ],                            
        _allEvents = [ "click", "change", "keydown", "scroll", "focusout", "focusin" ]; 

    function AdrianSux( eventsArr ) {
      self = this;
      _allEvents = eventsArr || _allEvents;
    }

    var eachDo = function( collection, callback ) {
      for( var i in collection )
        if( collection.hasOwnProperty( i ) )
          callback( collection[ i ] );
    };

    var eventHandle = function( e ) {
      var ev = packEvent( e );
      _history.push( ev );
      console.info( ev );
    };

    var getScrollPosition = function( elem ) {
      var pos = { x: 0, y: 0 };
      if( elem.nodeType === 9 ) { //document
        pos.y = window.pageYOffset || document.body.scrollTop;
        pos.x = window.pageXOffset || document.body.scrollLeft;
      }
      else {
        pos.x = elem.scrollLeft;
        pos.y = elem.scrollTop;
      }

      return pos;
    };

    var packEvent = function( e ) {
      var data = { 
        type: e.type,
        xpath: getElementXPath( e.target ) || "/"
      };
      if( e.type === "scroll" )
        data.scrollTop = getScrollPosition( e.target );
      else if( e.type === "click" )
        data.coords = { x: e.pageX, y: e.pageY }
      else if( e.type === "keydown" ) //todo maybe translate shift key presses
        data.keyCode = e.keyCode

      return data;
    };

    var getElementXPath = function( elem ) {
      var segs, i, sib;
      for( segs = []; elem && elem.nodeType === 1; elem = elem.parentNode ) {
        if( elem.hasAttribute( "id" ) ) {
          segs.unshift( 'id("' + elem.getAttribute( 'id' ) + '")' );
          return segs.join( '/' );
        }
        else if( elem.hasAttribute("class") )
          segs.unshift( elem.localName.toLowerCase( ) + '[@class="' + elem.getAttribute('class') + '"]' );
        else {
          for( i = 1, sib = elem.previousSibling; sib; sib = sib.previousSibling )
            if( sib.localName == elem.localName ) 
              i++;
            segs.unshift( elem.localName.toLowerCase( ) + '[' + i + ']' );
        }
      }
      return segs.length ? '/' + segs.join( '/' ) : null;
    };

    AdrianSux.prototype = {
      on: function( elem, type ) {
        if ( elem.addEventListener )
          elem.addEventListener( type, eventHandle, false );
        else if ( elem.attachEvent )
          elem.attachEvent( "on" + type, eventHandle );
      },
      off: function( elem, type ) {
        if( elem.removeEventListener )
          elem.removeEventListener( type, eventHandle, false );
        else if( elem.detachEvent )
          elem.detachEvent( "on" + type, eventHandle );
      },
      reset: function( ) {
        _history = [ ];
      },
      record: function( elem ) {
        elem = elem || document;
        eachDo( _allEvents, function( type ) {
          self.on( elem, type );
        } ); 
      },
      stopRecording: function( elem ) {
        elem = elem || document;
        eachDo( _allEvents, function( type ) {
          self.off( elem, type );
        } ); 
      },
      getElementByXPath: function( path ) {
        return document.evaluate( path, document, null, 9, null ).singleNodeValue;
      },
      getHistory: function( ) {
        console.info( _history );
      }
    };

    return AdrianSux;
  }( );

} )( window, document, undefined );
