import { ReactECharts } from '@/components/Charts/ReactECharts'

function DonutChart(props){
    //get data and create corresponding color list
    const colors = []
    const data = []
    const legendEntries = []
    for (const category of props.data){
        if(category.value > 0){
            colors.push(category.color)
            data.push(category)
            legendEntries.push(category.name)
        }
    }

    if(props.half){
        //empty record to omit 50%
        data.unshift({
            value: data.reduce((a,c) => a + c.value, 0),
            itemStyle: {
                // stop the chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none'
                }
            },
            label: {
                show: false
            },
        })
    }

    const sum = data.reduce((a,c) => a + c.value, 0)

    return(
    <>
    <div style={{height: '100%', width: '100%'}}>
    
    {data.length > 0 && <>
    <div style={{float: 'left', height: '100%', width: '50%'}}>
    <ReactECharts
        option={{
            title: {
                text: props.title,
                left: 'center',
                show: (props.title != undefined)
            },
            color: colors,
            tooltip: {
                show: true,
                formatter: '{c}'
            },
            series: [
                {
                    startAngle: 90,
                    type: 'pie',
                    top: 'center',
                    left: '20',
                    label: {
                        show: true,
                        position: 'center',
                        fontSize: '16',                    
                        formatter: function(d){
                            return 'gesamt:\n' + sum
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data, 
                    radius: ['50', '70'],
                    minAngle: !props.half && 10
                }
            ]
        }}
    />
    </div>
    <div style={{float: 'right', height: '100%', width: '50%'}}>
    <ReactECharts
        option={{
            legend: {
                orient: props.orientation || 'vertical',
                top: 'center',
                right: '50',
                data: legendEntries,
                textStyle: {
                    fontSize: '15',                    
                }
            },
            color: colors,
            series: [
                {
                    type: 'pie',
                    label: {
                        show: false,
                        position: 'center',
                    },
                    labelLine: {
                        show: false
                    },
                    data: data,
                    //make it invisible 
                    radius: 0,
                }
            ]
        }}
    />
    </div>
    </>
    }
    {data.length <= 0 &&
    <span>keine Daten verfügbar</span>
    }
    </div>
    </>
    )
    }

export default DonutChart