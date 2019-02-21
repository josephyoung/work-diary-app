## React
<table>
<tr><td>Prefix</td><td>	 Method </td>
<tr><td>imr→</td><td>	import React from 'react'</td></tr>
<tr><td>imrd→</td><td>	import ReactDOM from 'react-dom'</td></tr>
<tr><td>imrc→</td><td>	import React, { Component } from 'react'</td></tr>
<tr><td>imrcp→</td><td>	import React, { Component } from 'react' & import PropTypes from 'prop-types'</td></tr>
<tr><td>imrpc→</td><td>	import React, { PureComponent } from 'react'</td></tr>
<tr><td>imrpcp→</td><td>	import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'</td></tr>
<tr><td>imrm→</td><td>	import React, { memo } from 'react'</td></tr>
<tr><td>imrmp→</td><td>	import React, { memo } from 'react' & import PropTypes from 'prop-types'</td></tr>
<tr><td>impt→</td><td>	import PropTypes from 'prop-types'</td></tr>
<tr><td>imrr→</td><td>	import { BrowserRouter as Router, Route, Link } from 'react-router-dom'</td></tr>
<tr><td>redux→</td><td>	import { connect } from 'react-redux'</td></tr>
<tr><td>rconst→</td><td>	constructor(props) with this.state</td></tr>
<tr><td>rconc→</td><td>	constructor(props, context) with this.state</td></tr>
<tr><td>est→</td><td>	this.state = { }</td></tr>
<tr><td>cwm→</td><td>	componentWillMount = () => { } DEPRECATED!!!</td></tr>
<tr><td>cdm→</td><td>	componentDidMount = () => { }</td></tr>
<tr><td>cwr→</td><td>	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!</td></tr>
<tr><td>scu→</td><td>	shouldComponentUpdate = (nextProps, nextState) => { }</td></tr>
<tr><td>cwup→</td><td>	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!</td></tr>
<tr><td>cdup→</td><td>	componentDidUpdate = (prevProps, prevState) => { }</td></tr>
<tr><td>cwun→</td><td>	componentWillUnmount = () => { }</td></tr>
<tr><td>gdsfp→</td><td>	static getDerivedStateFromProps(nextProps, prevState) { }</td></tr>
<tr><td>gsbu→</td><td>	getSnapshotBeforeUpdate = (prevProps, prevState) => { }</td></tr>
<tr><td>ren→</td><td>	render() { return( ) }</td></tr>
<tr><td>sst→</td><td>	this.setState({ })</td></tr>
<tr><td>ssf→</td><td>	this.setState((state, props) => return { })</td></tr>
<tr><td>props→</td><td>	this.props.propName</td></tr>
<tr><td>state→</td><td>	this.state.stateName</td></tr>
<tr><td>rcontext→</td><td>	const ${1:contextName} = React.createContext()</td></tr>
<tr><td>cref→</td><td>	this.${1:refName}Ref = React.createRef()</td></tr>
<tr><td>fref→</td><td>	const ref = React.createRef()</td></tr>
<tr><td>bnd→</td><td>	this.methodName = this.methodName.bind(this)</td></tr>
## React Native
<tr><td>Prefix</td><td>Method</td></tr>
<tr><td>imrn→</td><td>	import { $1 } from 'react-native'</td></tr>
<tr><td>rnstyle→</td><td>	const styles = StyleSheet.create({})</td></tr>
</table>

## Redux
Prefix	Method
rxaction→	redux action template
rxconst→	export const $1 = '$1'
rxreducer→	redux reducer template
rxselect→	redux selector template
PropTypes
Prefix	Method
pta→	PropTypes.array
ptar→	PropTypes.array.isRequired
ptb→	PropTypes.bool
ptbr→	PropTypes.bool.isRequired
ptf→	PropTypes.func
ptfr→	PropTypes.func.isRequired
ptn→	PropTypes.number
ptnr→	PropTypes.number.isRequired
pto→	PropTypes.object
ptor→	PropTypes.object.isRequired
pts→	PropTypes.string
ptsr→	PropTypes.string.isRequired
ptnd→	PropTypes.node
ptndr→	PropTypes.node.isRequired
ptel→	PropTypes.element
ptelr→	PropTypes.element.isRequired
pti→	PropTypes.instanceOf(name)
ptir→	PropTypes.instanceOf(name).isRequired
pte→	PropTypes.oneOf([name])
pter→	PropTypes.oneOf([name]).isRequired
ptet→	PropTypes.oneOfType([name])
ptetr→	PropTypes.oneOfType([name]).isRequired
ptao→	PropTypes.arrayOf(name)
ptaor→	PropTypes.arrayOf(name).isRequired
ptoo→	PropTypes.objectOf(name)
ptoor→	PropTypes.objectOf(name).isRequired
ptsh→	PropTypes.shape({ })
ptshr→	PropTypes.shape({ }).isRequired
ptany→	PropTypes.any
ptypes→	static propTypes = {}
