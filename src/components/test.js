import React from 'react';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			rows : 0,
			column : 0,
			border : 1,
			rowNum : [],
			columNum : [],
			soil : [],
			check : [],
			changeToCross : "",
			showFinalGrid : null,
			hideInitialShow : false

		}
		this.createRowGrid = this.createRowGrid.bind(this)
		this.createColumnGrid = this.createColumnGrid.bind(this)
		this.onInitialSubmit = this.onInitialSubmit.bind(this)
		this.changeToCross = this.changeToCross.bind(this);
	}

	createRowGrid(){
		for(var i=0;i<this.state.rows;i++){
        this.state.rowNum[i] = 1
		}
		this.createColumnGrid();
	}

	createColumnGrid(){
		for(var i=0;i<this.state.column;i++){
			this.state.columNum[i] = 1
		}
	}

	onInitialSubmit(){
		if(this.refs.row.value == 0 || this.refs.column.value == 0){
			alert("Please enter values greater than 0")
		} else {
			this.setState({
				rows : this.refs.row.value,
				column : this.refs.column.value,
				hideInitialShow : true
			})
				this.createRowGrid();
		}

	}



	changeToCross(c,r,e){
		if(e.target.value){
			e.target.value = "x"
		} else if(e.target.value == ""){
			e.target.value = ""
		}
	}


	 createArray(c,r,e){
       for(var i=0;i<this.state.rows;i++){
					 if(this.state.check[i] != 1){
 							this.state.soil[i] = [],
 							this.state.check[i] = 1
					 }
          for(var j=0;j<this.state.column;j++){
            if(j==c && i == r) {
              this.state.soil[r][c] = "x"
            } else {
							if(this.state.soil[i][j] != "x" ){
								this.state.soil[i][j] = 0
							}
						}
          }
       }
			  this.changeToCross(c,r,e);
    }


		onFinalSubmit(){
      for(var r=0;r<this.state.rows;r++) {
				for(var c=0;c<this.state.column;c++) {
					if(this.state.soil[r][c] == "x"){
					 // var c = this.state.soil[r].indexof(this.state.soil[r][c])
					 // console.log("index",index);

						if(c<this.state.column && r<this.state.rows){
							if(c<this.state.column-1){
								if(this.state.soil[r][c+1] != "x"){
	 				        this.state.soil[r][c+1] = this.state.soil[r][c+1] + 1
	 				      }
							}
							if(c<this.state.column-1 && r<this.state.rows-1){
								if(this.state.soil[r+1][c+1] != "x"){
									this.state.soil[r+1][c+1] = this.state.soil[r+1][c+1] + 1
								}
							}
							if(r<this.state.rows-1){
								if(this.state.soil[r+1][c] != "x"){
									this.state.soil[r+1][c] = this.state.soil[r+1][c] + 1
								}
							}

							if(r>0){
								if(c<this.state.column-1){
									if(this.state.soil[r-1][c+1] != "x"){
									 this.state.soil[r-1][c+1] = this.state.soil[r-1][c+1] + 1
									}
								}
								if(this.state.soil[r-1][c] != "x"){
								 this.state.soil[r-1][c] = this.state.soil[r-1][c] + 1
								}
							}
							if(c>0 && r>0){
								if(this.state.soil[r-1][c-1] != "x"){
								 this.state.soil[r-1][c-1] = this.state.soil[r-1][c-1] + 1
								}
							}
							if(c>0){
								if(this.state.soil[r][c-1] != "x"){
								 this.state.soil[r][c-1]= this.state.soil[r][c-1] + 1
								}
								if(r<this.state.rows-1){
									if(this.state.soil[r+1][c-1] != "x"){
									 this.state.soil[r+1][c-1] = this.state.soil[r+1][c-1] + 1
									}
								}
							}
						}

					}
				}
			}
			this.setState({
				showFinalGrid : true
			})
		}

		Reset(){
			location.reload();
			this.setState({
				showFinalGrid : null,
				soil : []
			})
		}



	render(){
		let inputRef = null

		if(this.state.rowNum != null){
		var table = <table border={this.state.border}>
		   { this.state.rowNum.map((row,rowIndex)=>{
			  return (
					<tbody  key={rowIndex}><tr>
			    { this.state.columNum.map((row,columnIndex)=>{
			     	 return ( <td key={columnIndex}><input type="text"   onChange={this.createArray.bind(this,columnIndex,rowIndex)}  /></td>)
			     	})
			    }
			    </tr></tbody>)
			})}
		</table>
	}


	if(this.state.showFinalGrid != null){
	var newTable = <table border={this.state.border}>
		 { this.state.soil.map((newSoil,rowIndex)=>{
			return (
				<tbody  key={rowIndex}><tr>
				{ newSoil.map((showGrid,columnIndex)=>{
					 return ( <td key={columnIndex}><input type="text"   value={showGrid} /></td>)
					})
				}
				</tr></tbody>)
		})}
	</table>
}


		return(
			<div>

			  {this.state.columNum.length>0 && this.state.rowNum.length>0 ? "":  <div >
 				<label>
 					Enter the number of rows in grid :
 					<input type="text" ref="row"  />
 				</label><br />
 				<label>
 					Enter the number of columns in grid :
 					<input type="text"  ref="column"   />
 				</label> <br />
				{this.state.columNum.length>0 && this.state.rowNum.length>0 ? "" : <button className="bt btn-success"  onClick = {this.onInitialSubmit}> click 3 Times </button>}
 				</div>}



				{this.state.columNum.length>0 && this.state.rowNum.length>0 && !this.state.showFinalGrid ? <div> {table} </div> : "" }
				{this.state.showFinalGrid ? <div>{newTable}</div> : "" }
				 <div>
				 {this.state.showFinalGrid ? <input type="button" value="Reset" onClick = {this.Reset.bind(this)}/>  :""}
				 </div>
				 {this.state.columNum.length>0 && this.state.rowNum.length>0  ? <input type="button" value="FinalSubmit" onClick = {this.onFinalSubmit.bind(this)}/> : " "}
		   </div>
		)
	}

}
