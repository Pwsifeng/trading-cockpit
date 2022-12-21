import React, { useEffect, useState } from 'react';
import { createMap } from '../../utils/map3d'
import { useAtom } from 'jotai';
import { mapObj_atom } from '../../jotai/store';
import configjson from '../../api/get_configjson';
import './style.scss'

const Map = (props) => {

	const [mapObj, setMapObj] = useAtom(mapObj_atom)

	useEffect(() => {
		if (props.url) { createMapsss(props.url) }
	}, [props.url])

		// eslint-disable-next-line
	const createMapsss = (url) => {
		var map_dark = createMap.createMap({
			id: "mapv3dContainer_dark",
			url: url,
			projectId: configjson.projectId2,
			token: configjson.token2
		}, () => { })
		setMapObj({ ...mapObj, map2: map_dark })
	}

	return (
		<div id="mapv3dContainer_dark" style={{ width: props.setWidth }}></div>
	)
}

export default Map;