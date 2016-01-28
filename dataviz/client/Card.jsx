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
          <div className={"card black-text"} >
              <ul className="collection with-header">
                  <li className= {"collection-header " + this.props.color }>
                      <h4 className="card-title">{this.props.title}</h4>
                  </li>
                  <li className="collection-item ">
                      <h4> {this.props.value + " " + this.props.unit} </h4>
                  </li>
              </ul>
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
                <div className={"card black-text"} >
                    <ul className="collection with-header">
                        <li className= {"collection-header " + this.props.color }>
                            <h4 className="card-title">{this.props.title}</h4>
                        </li>
                        <li className="collection-item ">
                            <span>Max : {this.props.max + " " + this.props.unit}</span>
                        </li>
                        <li className="collection-item ">

                            <span>Min : {this.props.min + " " + this.props.unit}</span>
                        </li>
                    </ul>
                </div>
            );
        }
    });
