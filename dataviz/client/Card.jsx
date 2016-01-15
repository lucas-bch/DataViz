BasicCard = React.createClass({
      getInitialState: function(){
          return {
          color:"red",
          title:"undefined",
          value:"undefined",
          unit: "undefined"
          }
      },
      render: function() {
          return (
              <div className={"card " + this.props.color +" white-text"} >
                      <h4 className="card-title">{this.props.title}</h4>
                  <div className="card-content">
                      <h4>{this.props.value + " " + this.props.unit}</h4>
                  </div>
              </div>
          );
      }
  });

  MaxMinCard = React.createClass({
        getInitialState: function(){
            return {
            color:"red",
            title:"undefined",
            min:"undefined",
            max: "undefined",
            unit: "undefined"
            }
        },
        render: function() {
            return (
                <div className={"card " + this.props.color +" white-text"} >
                        <span className="card-title">{this.props.title}</span>
                    <div className="card-content">
                        <h4>{this.props.max + " " + this.props.unit}</h4>
                        <h4>{this.props.min + " " + this.props.unit}</h4>
                    </div>
                </div>
            );
        }
    });
