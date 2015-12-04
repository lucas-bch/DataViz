Loader = React.createClass({

    // Trois classe possible
    // -> closed : le loader est fermé
    // -> open : le loader est est ouvert
    // -> closing : le loader se ferme

    getInitialState: function() {
        return {
            class: ""
        };
    },

    // Enlève le display non
    open:function(){
        this.state.class = ""
    },

    // Ajoute la classe closing
    close:function(){
        this.setState({class: "closed"});
    },

    render: function() {
        return (
        <div id="loadscreen" className={this.state.class}>
            <div className="icon sun-shower" onClick={this.close}>
                <div className="cloud"></div>
                <div className="sun">
                    <div className="rays"></div>
                </div>
                <div className="rain"></div>
                <svg version="1.1" id="L5"  x="0px" y="0px"
                     viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                    <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 15 ; 0 -15; 0 15"
                            repeatCount="indefinite"
                            begin="0.1"/>
                    </circle>
                    <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 10 ; 0 -10; 0 10"
                            repeatCount="indefinite"
                            begin="0.2"/>
                    </circle>
                    <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.3"/>
                    </circle>
                </svg>
            </div>
        </div>

        );
    }
});