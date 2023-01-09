import { ReactECharts } from '@/components/Charts/ReactECharts'
import useKmData from '@/hooks/useKmData'
// import {
//   ModalsplitAuto,
//   ModalsplitBus,
//   ModalsplitFahrrad,
//   ModalsplitHintergrundgrafik,
//   ModalsplitSchuh,
// } from '@/components/Icons/'

export default function KmChart() {
  const colors = ['#FF8800', '#59ABE3', '#26C281', '#8800FF']
  const data = useKmData()

  const totalFuß: number = data
    .map(d => d.Fuß)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalKFZ: number = data
    .map(d => d.MIV)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalRad: number = data
    .map(d => d.Rad)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const totalÖPNV: number = data
    .map(d => d.ÖPNV)
    .reduce((acc, cur) => {
      return acc + cur
    }, 0)

  const total: number = totalÖPNV + totalFuß + totalKFZ + totalRad

  const KfzData: number = parseInt(((totalKFZ / total) * 100).toFixed(0))
  const RadData: number = parseInt(((totalRad / total) * 100).toFixed(0))
  const ÖPNVData: number = parseInt(((totalÖPNV / total) * 100).toFixed(0))
  const FußData: number = parseInt(((totalFuß / total) * 100).toFixed(0))

  return (
    <ReactECharts
      option={{
        title: {
          text: total.toLocaleString('de-DE') + ' km',
          left: 'center',
          top: 'center',
          padding: 4,
          textStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        },
        backgroundColor: {
          imageHeight: 375,
          imageWidth: 720,
          image:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NDEuMzYyIiBoZWlnaHQ9IjcwMC41OTYiIHZpZXdCb3g9IjAgMCA4NDEuMzYyIDcwMC41OTYiPgogIDxnIGlkPSJLb21wb25lbnRlXzU5XzQiIGRhdGEtbmFtZT0iS29tcG9uZW50ZSA1OSDigJMgNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAyLjg4NykiPgogICAgPGcgaWQ9IkdydXBwZV81NyIgZGF0YS1uYW1lPSJHcnVwcGUgNTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01MTQuMjcxIC04MTY3Ljc1NSkiPgogICAgICA8ZyBpZD0iR3J1cHBlXzU0IiBkYXRhLW5hbWU9IkdydXBwZSA1NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg0Ljk0NiAtMTAzNC4zMzgpIj4KICAgICAgICA8cGF0aCBpZD0iUGZhZF8zNyIgZGF0YS1uYW1lPSJQZmFkIDM3IiBkPSJNMjQ0Ljk4OSwzNTkzLjkwOWMtLjgxMi0yNi44NTUsMjguNzMtMTA0Ljc0NSw3MS42MDUtMTUxLjY0NnMxMDUuNDU0LTcuOCwyMDYuNTIxLTE5LjcyMiwyOTQuMjg2LTEwNS4xNjIsMzQwLjcyNiwzMy4xODcsNzQuNTU3LDMxMi43LTEzLjEsNDAzLjIxNVM3MjcuNzI0LDQwNTAuNTIsNjUzLjgzMiw0MDU4Ljk2cy0yMjguMjEzLTU0LjcxOC0yNzEuOTI1LTY0LjA0OSwyMy4zNTctOTQuMDUzLDAtMTM1Ljk2N1MyNjAuNDgsMzc0MS4wMTQsMjY1LjQxMywzNjk1LjQsMjQ1LjgsMzYyMC43NjUsMjQ0Ljk4OSwzNTkzLjkwOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4OS4zMTIgNTgyMS4zMTcpIiBmaWxsPSIjMzRjMTdiIiBvcGFjaXR5PSIwLjA2NCIvPgogICAgICAgIDxwYXRoIGlkPSJQZmFkXzM4IiBkYXRhLW5hbWU9IlBmYWQgMzgiIGQ9Ik0tMTYuNjM1LDQwNjAuNDM0Yy01LjctMTcuMTgxLTE4LjY5NS0yNS4yMTUsMC0zMC4yNnM2MC4wOTQtMzUuNTc4LDk2LjAxNS03Mi43OSw4Ni4wMzgtMjUuNzkzLDkzLjMxNS00NS44ODksMzkuODMzLTE0Ljk2NCw0MS4wMDcsMCwyNi45NDUsNDcuMjE2LTkuNTcsNjMuNzY5LTE1NS4xNzcsNTkuODE1LTE3MS41MjQsODUuMTctMzcuMjE5LDUwLjEzNy00OS4yNDMsNTMuOTA2LTUyLjUsOS42MTktNTAuMTczLDBTLTEwLjkzMyw0MDc3LjYxNS0xNi42MzUsNDA2MC40MzRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOTYuMjMgNTc1NC4zNjQpIiBmaWxsPSJyZ2JhKDU4LDE2MCwyMTMsMC4wNykiLz4KICAgICAgICA8cGF0aCBpZD0iUGZhZF8zOSIgZGF0YS1uYW1lPSJQZmFkIDM5IiBkPSJNMjAyLjc4OSwzMzQ4LjQzMnM0OS4zLDY5LjY4NSw3Ny42NTIsODguNzQ2LDYwLjg0LDY1LjQ3Nyw1Ni45LDE2OS4yNTIsMTIuNTE2LDEzNi4zOTIsMjguMTg0LDE1NS4xMzksMjguMjYyLDMwLjY0MywyMC44MzMsNzYuNTM0LTQuNzE4LDc0LjI2NywwLDEwMS44MzEtNS42NzIsODguNjE4LTIwLjgzMywxMDIuNTIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjguMDk1IDU4NTMuNjYxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+CiAgICAgICAgPHBhdGggaWQ9IlBmYWRfNDAiIGRhdGEtbmFtZT0iUGZhZCA0MCIgZD0iTTQyOS40ODgsNDAyNS45NTRzNTAuNTY4LTI3LjYsNzYuMzM0LTI5Ljc2NCw3NS40MjUsMCw3NS40MjUsMGgzMS45M3M2OS43LTI3Ljk0Niw5MS40Ny00OS42MjgsNzUuNzItMTExLjUzLDkzLjAyOC0xMTkuMjUsMTkuMDMsMCwxOS4wMywwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjcuMTU1IDU3NjcuNzk5KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjciLz4KICAgICAgICA8cGF0aCBpZD0iUGZhZF80MSIgZGF0YS1uYW1lPSJQZmFkIDQxIiBkPSJNNTc3LjY4MSw0MTQ2LjY0NWw0OC4yMzEtMTEwLjYzNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAwLjc2OCA1NzM0LjQwNykiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBmYWRfNDIiIGRhdGEtbmFtZT0iUGZhZCA0MiIgZD0iTTk5OS42NzcsMzg4OC42NDdjLTQ2LjczLTI5LjQ3NS05Ni40MTItNjAuMTg3LTEwMC43MTQtNjEuNDQzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDIuMzcyIDU3NjcuMTk5KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICAgICAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzEzIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTMiIGN4PSIxMy45MyIgY3k9IjEzLjkzIiByPSIxMy45MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODE0Ljc1IDk3NDAuNDUyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEwIi8+CiAgICAgICAgPHBhdGggaWQ9IlBmYWRfNDMiIGRhdGEtbmFtZT0iUGZhZCA0MyIgZD0iTTMzMC41NDIsMzQ3Ni4xNjFzODMuMTcyLTguNTYxLDEyNC4wOCwwLDQyLjEyMSw0NC40MzEsOTguNTM0LDU1Ljc4NywxMzIuMDI1LDQyLjU3MiwxNDUuMDE4LDY1LjQsMzQuMzQ5LDY5LjkyMSw5OS42MTcsNzAuOTU4LDEyNy4yMjYsMTcuNjI3LDEyNy4yMjYsMTcuNjI3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDUuMDIzIDU4MzEuMjgxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICAgICAgICA8cGF0aCBpZD0iUGZhZF80NCIgZGF0YS1uYW1lPSJQZmFkIDQ0IiBkPSJNNDI5LjQ4OCwzODQ4LjQwNXM1Ny42NTYsMjguMSw3Ni41NjMsMzQuNzY2LDYzLjgwOCw0MC4wMTQsMTAwLjUwOSwzNi4zODQsNzEuMDY1LTQ3LjA2Niw4Ni40MTEtNjAuMTU3LDU5LjEzNy04My43Miw3MS44NC05MS40MDYsMjMuODc5LTUyLjQ4NSwyOC41OTEtNjAuODMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNy4xNTUgNTc4OC44NzcpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgICAgIDxwYXRoIGlkPSJQZmFkXzQ1IiBkYXRhLW5hbWU9IlBmYWQgNDUiIGQ9Ik0zODEuMzM4LDM5MDQuOTg5czM3LjE4NCw1LjcsNDQuNTM0LDAsMzYuNDY3LTU5LjYwNSw0My45ODItNjQuMDIyLDUzLjQ2Mi03MS43Myw1Ny4wMzEtNzIuODU4LTI5Ljg5MS0xMi44MS0yOS44OTEtMTIuODEtMjMuMzI3LTYuNTg1LTM3Ljk2MywwLTIzLjgsMTAuNDkxLTI4LjM5MywwLTYuNDYtMzEuNzc5LTY0LjA1Mi00MS43NjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIzOC41MTQgNTc4Ny43MjgpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgICAgIDxwYXRoIGlkPSJQZmFkXzQ2IiBkYXRhLW5hbWU9IlBmYWQgNDYiIGQ9Ik0zMDUuODc5LDM1NDYuMDQyczczLjg3MywzLjc4Myw4Ny42MjgsNS43MzEsMjkuOTEzLTguNzksNTEuNjIxLTUuNzMxLDM4Ljk2NSwzMS45NzUsNTUuNjcyLDM2LjY0LDg4LjM1LDE4LjQxLDk3LjExNCwyMi40OTMsMjQuNTU4LDI0LjMxOSwyNC44MywzOC4zNzQtOS4yNTYsNDcuMS0xMS44NzgsNDguMy0zMi42OTUtMTEuMjE2LTM5LjItMTEuMjg0LTUxLjEtNS42NTgtNTUuNDQzLTQuNDM0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDkuNDc3IDU4MTguMDc0KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICAgICAgICA8cGF0aCBpZD0iUGZhZF80NyIgZGF0YS1uYW1lPSJQZmFkIDQ3IiBkPSJNNTM5LjE1OSwzNzQxLjk0NHM3LjUtMjYuNjM4LDEwLjQ0NC0zMi41ODMsOC44MDgtMjAuOSw4Ljk2OS0yOC44LDYuMzMzLTM3LjA3MSw2LjMzMy0zNy4wNzFMNTM1Ljc3NSwzNjIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDcuOTYgNTgwNC40MzcpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgICAgIDxwYXRoIGlkPSJQZmFkXzQ4IiBkYXRhLW5hbWU9IlBmYWQgNDgiIGQ9Ik01MDEuNCwzNTAxLjEzM2wtMzEuNzQ5LDIyLjVzMS4yMTcsMTAuMTQ1LDMuMDg1LDE1LjY4My0yLjg5MywzMC40MzYtMy4wODUsMzMuNjU1LDQuMjQsMTUuODUyLDAsMjAuNS0yOS4xOTIsMTUuMzg4LTI5LjE5MiwxNS4zODhsMi45LDExLjMtMTQuODMyLDEyLjZzLTcuMDU4LDYuNi05Ljk2OSwxMS44MTQtOS42LDM2LjcyOC0xMS43OTMsMzkuNjc2LTEwLjk0OSwyNy4zODYtNy4zODMsMzguOTg4LDEyLjEyNywzMy45MjEsMTIuNDM3LDM3LjA3NS0yMi4wNjcsOS44MjUtMjIuMDY3LDkuODI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzQuMzMyIDU4MjYuMDg0KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICAgICAgICA8cGF0aCBpZD0iUGZhZF80OSIgZGF0YS1uYW1lPSJQZmFkIDQ5IiBkPSJNNjIzLjM0MywzNTQ1LjQ4OXMuNzQ2LDQ2LjEzOSwwLDUwLjQ4My03LjU3OSwyMC4wMzMtNC4wNzEsMjIuMzY5LDE5LjQxNSw4Ljc1MSwxOS4zLDI3Ljk0YTIzOC4xNiwyMzguMTYsMCwwLDEtMy42NjYsMzcuODM5cy00MC45LTI3Ljc3Ni00Mi42MzktMjkuNTA3LTcuNDQtNC45NDUtNy40NC00Ljk0NSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTk5LjEwMSA1ODE4LjA3NCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBmYWRfNTAiIGRhdGEtbmFtZT0iUGZhZCA1MCIgZD0iTTYzMy40MjgsMzk1MS43MDhzLjgtMzIuNDQyLDAtNDIuMDc3LTEwLjI3OC0zNS40NDMtMTEuMzI3LTQxLjc0OS01LjEwNy0zNy42OTQtNC44NzItNDIuNDksNy42OS0yOC45NjgsNC44NzItNTYuMDcsMC00Ni4zMTIsMC00Ni4zMTJ2LTEyLjcxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkzLjI1MiA1Nzg4LjMxMikiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICAgICAgPHBhdGggaWQ9IlBmYWRfNTEiIGRhdGEtbmFtZT0iUGZhZCA1MSIgZD0iTTYzNy40MzMsMzk0Ni4zNjlzMTguODc4LTE3LjU0OCwyNC44NzktMTcuNjc2LDQwLDAsNDAsMGwxMy4yODMsNy44MTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4OS42MDIgNTc0OC44ODIpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogICAgICAgIDxwYXRoIGlkPSJQZmFkXzUyIiBkYXRhLW5hbWU9IlBmYWQgNTIiIGQ9Ik02NTQsNDAzN3MyNC44NjgsMTEuNDc5LDUxLjg3MSwxMy4zNjUsNjkuNjE3LDguMTYsNjkuNjE3LDguMTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4Ni42MSA1NzI5LjMxMikiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgICAgIDwvZz4KICAgIDwvZz4KICAgIDxnIGlkPSJHcnVwcGVfNTYiIGRhdGEtbmFtZT0iR3J1cHBlIDU2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzkyLjgzIC04Mjc5LjI5NikiPgogICAgICA8cGF0aCBpZD0iUGZhZF81NyIgZGF0YS1uYW1lPSJQZmFkIDU3IiBkPSJNNjM2LjE3MiwyNzYxLjI0Mmg0My4zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDQgNTc4My44OTEpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDViNzkiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgICA8cGF0aCBpZD0iUGZhZF81OCIgZGF0YS1uYW1lPSJQZmFkIDU4IiBkPSJNNjQ0LjIzNiwyNTgyLjUzOXYtNDkuOTkzbDYuMDU1LTQuOTY1LDUuNjU1LDQuOTY1djIxLjkxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOTcuODMyIDU5NjIuNTk0KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA1Yjc5IiBzdHJva2Utd2lkdGg9IjIiLz4KICAgICAgPHBhdGggaWQ9IlBmYWRfNTkiIGRhdGEtbmFtZT0iUGZhZCA1OSIgZD0iTTc3NC44NzksMjU4Mi4xMzR2LTUwLjQwN2wtNi4zMzItNC42NzYtNi4yMTEsNC42NzZ2MjEuODI3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcuNTEgNTk2MykiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwNWI3OSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICAgIDxwYXRoIGlkPSJQZmFkXzYwIiBkYXRhLW5hbWU9IlBmYWQgNjAiIGQ9Ik02NzcuNTEzLDI2NDcuNTQzVjI2MjIuODVsMTIuMDcyLTEwLjI3MywxMi4zOCwxMC4yNzN2MjQuNjkzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzIuMzgyIDU4OTcuNTkpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDViNzkiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==',
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '50%'],
            labelLine: {
              length: 200,
              lineStyle: {
                color: 'black',
              },
            },
            data: [
              {
                value: KfzData,
                name: 'KFZ',
                label: {
                  alignTo: 'labelLine',
                  formatter: [
                    '  {Auto|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Auto: {
                      height: 50,
                      width: 50,
                      // align: 'left',
                      backgroundColor: {
                        image:
                          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MC41IiBoZWlnaHQ9IjU2LjUiIHZpZXdCb3g9IjAgMCA2MC41IDU2LjUiPgogIDxnIGlkPSJLb21wb25lbnRlXzYyXzQiIGRhdGEtbmFtZT0iS29tcG9uZW50ZSA2MiDigJMgNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4yNSAxLjI1KSI+CiAgICA8cmVjdCBpZD0iUmVjaHRlY2tfMTYiIGRhdGEtbmFtZT0iUmVjaHRlY2sgMTYiIHdpZHRoPSI1OCIgaGVpZ2h0PSIyMiIgcng9IjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMjYpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzI0IiBkYXRhLW5hbWU9IlBmYWQgMjQiIGQ9Ik03MTYsMTUxdjRhMiwyLDAsMCwxLTIsMmgtNWEyLDIsMCwwLDEtMi0ydi00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzI1IiBkYXRhLW5hbWU9IlBmYWQgMjUiIGQ9Ik03NTcsMTM3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzI2IiBkYXRhLW5hbWU9IlBmYWQgMjYiIGQ9Ik03MDMsMTM3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzI3IiBkYXRhLW5hbWU9IlBmYWQgMjciIGQ9Ik03NTcsMTMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzI4IiBkYXRhLW5hbWU9IlBmYWQgMjgiIGQ9Ik03MDMsMTMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMTEiIGRhdGEtbmFtZT0iRWxsaXBzZSAxMSIgY3g9IjQiIGN5PSI0IiByPSI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDMxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjI4NDQzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8cGF0aCBpZD0iUGZhZF8yOSIgZGF0YS1uYW1lPSJQZmFkIDI5IiBkPSJNNzA3LDEyOWwxLjU3NC0yMC40NmE2LDYsMCwwLDEsNS45ODItNS41NGgzMC44ODhhNiw2LDAsMCwxLDUuOTgyLDUuNTRMNzUzLDEyOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwMSAtMTAzKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjI4NDQzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzEyIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTIiIGN4PSI0IiBjeT0iNCIgcj0iNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDUgMzEpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzMwIiBkYXRhLW5hbWU9IlBmYWQgMzAiIGQ9Ik03NTMsMTUxdjRhMiwyLDAsMCwxLTIsMmgtNWEyLDIsMCwwLDEtMi0ydi00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzAxIC0xMDMpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmMjg0NDMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzMxIiBkYXRhLW5hbWU9IlBmYWQgMzEiIGQ9Ik03NDAsMTUxdi04YTIsMiwwLDAsMC0yLTJINzIyYTIsMiwwLDAsMC0yLDJ2OCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTcwMSAtMTAzKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjI4NDQzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPC9nPgo8L3N2Zz4K',
                      },
                    },
                    percent: {
                      color: '#FF8800',
                      align: 'center',
                      padding: [10, 0, 0, 5],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      color: 'darkblue',
                      // align: 'center',
                      padding: [5, 0, 0, 10],
                    },
                  },
                },
              },
              {
                value: ÖPNVData,
                name: 'ÖPNV',
                label: {
                  formatter: [
                    '  {Bus|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Bus: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      backgroundColor: {
                        image:
                          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3OC4yODgiIGhlaWdodD0iNDcuNSIgdmlld0JveD0iMCAwIDc4LjI4OCA0Ny41Ij4KICA8ZyBpZD0iS29tcG9uZW50ZV82M180IiBkYXRhLW5hbWU9IktvbXBvbmVudGUgNjMg4oCTIDQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMjUgMS4yNSkiPgogICAgPHBhdGggaWQ9IlBmYWRfMjIiIGRhdGEtbmFtZT0iUGZhZCAyMiIgZD0iTTU5MC4xNDcsMzk0LjJoLTYuNTMzQTIuNjIxLDIuNjIxLDAsMCwxLDU4MSwzOTEuNTg3VjM1Ny42MTNBMi42MjEsMi42MjEsMCwwLDEsNTgzLjYxMywzNTVoNzAuNTYxYTIuNjIxLDIuNjIxLDAsMCwxLDIuNjEzLDIuNjEzdjMzLjk3NGEyLjYyMSwyLjYyMSwwLDAsMS0yLjYxMywyLjYxM2gtNi41MzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01ODEgLTM1NSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE0YjNkOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogICAgPGxpbmUgaWQ9IkxpbmllXzE0IiBkYXRhLW5hbWU9IkxpbmllIDE0IiB4MT0iMzIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyIDM5KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTRiM2Q5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8ZWxsaXBzZSBpZD0iRWxsaXBzZV85IiBkYXRhLW5hbWU9IkVsbGlwc2UgOSIgY3g9IjYuNSIgY3k9IjYiIHJ4PSI2LjUiIHJ5PSI2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5IDMzKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTRiM2Q5IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzEwIiBkYXRhLW5hbWU9IkVsbGlwc2UgMTAiIGN4PSI2IiBjeT0iNiIgcj0iNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTQgMzMpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzIzIiBkYXRhLW5hbWU9IlBmYWQgMjMiIGQ9Ik02NTUuNTYxLDM1OUg1ODYuMzA3QTEuMzA3LDEuMzA3LDAsMCwwLDU4NSwzNjAuMzA3djkuMTQ3YTEuMzA3LDEuMzA3LDAsMCwwLDEuMzA3LDEuMzA3aDY5LjI1NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTU3OS43NzMgLTM1MS4xNzMpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxsaW5lIGlkPSJMaW5pZV8xNSIgZGF0YS1uYW1lPSJMaW5pZSAxNSIgeTI9IjExIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMSA4LjYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxsaW5lIGlkPSJMaW5pZV8xNiIgZGF0YS1uYW1lPSJMaW5pZSAxNiIgeTI9IjExIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOCA4LjYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxsaW5lIGlkPSJMaW5pZV8xNyIgZGF0YS1uYW1lPSJMaW5pZSAxNyIgeTI9IjExIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NCA4LjYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxsaW5lIGlkPSJMaW5pZV8xOCIgZGF0YS1uYW1lPSJMaW5pZSAxOCIgeTI9IjExIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1OCA4LjYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMxNGIzZDkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8L2c+Cjwvc3ZnPgo=',
                      },
                    },
                    percent: {
                      color: '#59ABE3',
                      align: 'center',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      color: 'darkblue',
                      align: 'left',
                      padding: [0, 0, 0, 5],
                    },
                  },
                },
              },
              {
                value: RadData,
                name: 'Fahrrad',
                label: {
                  formatter: [
                    '  {Rad|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Rad: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      backgroundColor: {
                        image:
                          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MS45ODgiIGhlaWdodD0iNTEuODczIiB2aWV3Qm94PSIwIDAgODEuOTg4IDUxLjg3MyI+CiAgPGcgaWQ9IktvbXBvbmVudGVfNjFfNCIgZGF0YS1uYW1lPSJLb21wb25lbnRlIDYxIOKAkyA0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjI1IDEuNTgzKSI+CiAgICA8cGF0aCBpZD0iUGZhZF8xIiBkYXRhLW5hbWU9IlBmYWQgMSIgZD0iTTM2OC4zNzksNDc4LjY5aC04LjUzNEEyLjg0NCwyLjg0NCwwLDAsMSwzNTcsNDc1Ljg0NWgwQTIuODQ0LDIuODQ0LDAsMCwxLDM1OS44NDUsNDczaDguNTM0YTIuODQ0LDIuODQ0LDAsMCwxLDIuODQ1LDIuODQ1aDBBMi44NDQsMi44NDQsMCwwLDEsMzY4LjM3OSw0NzguNjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzM1LjQwNCAtNDczKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzRjMTdiIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8Y2lyY2xlIGlkPSJFbGxpcHNlXzEiIGRhdGEtbmFtZT0iRWxsaXBzZSAxIiBjeD0iMTUuNSIgY3k9IjE1LjUiIHI9IjE1LjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTguMDQpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNGMxN2IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxlbGxpcHNlIGlkPSJFbGxpcHNlXzIiIGRhdGEtbmFtZT0iRWxsaXBzZSAyIiBjeD0iMTYiIGN5PSIxNS41IiByeD0iMTYiIHJ5PSIxNS41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0Ny40ODggMTguMDQpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNGMxN2IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMyIgZGF0YS1uYW1lPSJFbGxpcHNlIDMiIGN4PSI0LjUiIGN5PSI0LjUiIHI9IjQuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzUuMjQ0IDI5LjYwNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM0YzE3YiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogICAgPHBhdGggaWQ9IlBmYWRfMiIgZGF0YS1uYW1lPSJQZmFkIDIiIGQ9Ik0zNzMuMzM2LDUwNC43NTlIMzUyTDM2OS4wNjksNDgySDM5NC41MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMzNy43MTEgLTQ3MC4xNzMpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNGMxN2IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxsaW5lIGlkPSJMaW5pZV8xIiBkYXRhLW5hbWU9IkxpbmllIDEiIHgxPSIxNC40MjMiIHkyPSIxOS4yMzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxLjU2NyAxMi4wNCkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM0YzE3YiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogICAgPHBhdGggaWQ9IlBmYWRfMyIgZGF0YS1uYW1lPSJQZmFkIDMiIGQ9Ik0zNjIsNDc3bDIuNzU5LDcuMjI2LDcuMSwxOC42NjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzMuNTY0IC00NzEuMzEpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNGMxN2IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzQiIGRhdGEtbmFtZT0iUGZhZCA0IiBkPSJNMzg4LjcsNDczYTYuMjQxLDYuMjQxLDAsMCwxLTUuOTE3LDQuMjY3SDM3OS42MmwxMS45MiwzMS4yOTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMjcuNDAxIC00NzMpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzNGMxN2IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8L2c+Cjwvc3ZnPgo=',
                      },
                    },
                    percent: {
                      color: '#26C281',
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      color: 'darkblue',
                      padding: [0, 0, 0, 10],
                    },
                  },
                },
              },
              {
                value: FußData,
                name: 'Fußgänger:innen',
                label: {
                  alignTo: 'labelLine',
                  formatter: [
                    '  {Schuh|}',
                    ' {name|{b}} ',
                    ' {percent|{c}%}',
                  ].join('\n'),
                  rich: {
                    Schuh: {
                      height: 50,
                      width: 50,
                      align: 'left',
                      padding: [5, 0, 0, 0],
                      backgroundColor: {
                        image:
                          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MC44MzMiIGhlaWdodD0iNDIuOTE5IiB2aWV3Qm94PSIwIDAgODAuODMzIDQyLjkxOSI+CiAgPGcgaWQ9IktvbXBvbmVudGVfNjBfNCIgZGF0YS1uYW1lPSJLb21wb25lbnRlIDYwIOKAkyA0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjMyOSAxLjI1OCkiPgogICAgPHBhdGggaWQ9IlBmYWRfMzIiIGRhdGEtbmFtZT0iUGZhZCAzMiIgZD0iTTM0Ny4yNDUsNzQ1LjY1N2E1NS42LDU1LjYsMCwwLDAsNi41NzctLjQ1LDY3LjIzNSw2Ny4yMzUsMCwwLDEsMTkuNTU2LDEuNmM2LjE2LDEuMzA2LDEyLjEsMy40ODIsMTguMzgzLDMuODMxYTM0LjI4OSwzNC4yODksMCwwLDAsMTguMDItMy42MTQsMTQuMTI5LDE0LjEyOSwwLDAsMCw1LjY2LTQuOTc4LDYuMTE4LDYuMTE4LDAsMCwwLC44MzYtNC42MTQsNS42NTMsNS42NTMsMCwwLDAtNS4xMDgtMy44Yy0yLjMtLjE3NC00LjU1NS42ODItNi44Ni43NDFhMzMuMzQ0LDMzLjM0NCwwLDAsMS04LjU0Ni0uODQyLDM3LjAxNSwzNy4wMTUsMCwwLDEtMTUuMzYzLTcuNzc5LDc3LjIxNiw3Ny4yMTYsMCwwLDAtMTEuOTA4LTguNTc0LDEuMzMyLDEuMzMyLDAsMCwwLTEuODMxLjU5MywxMi4xODgsMTIuMTg4LDAsMCwxLTguMjQ0LDYuNTQzLDEzLjI5MywxMy4yOTMsMCwwLDEtMTAuMDEyLTEuNDljLS4xNzgtLjEtLjU5Mi0uMzEzLTEuMDE1LS41MzlhMS4zMzEsMS4zMzEsMCwwLDAtMS44LjUzMmMtMi44ODEsNS4zMTktNS41NDMsMTIuNzU1LTQuMzE1LDIxLjEwNkExMS4wODYsMTEuMDg2LDAsMCwwLDM0Ny4yNDUsNzQ1LjY1N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzguMjI3IC03MTcuMDEpIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MDYwZDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzMzIiBkYXRhLW5hbWU9IlBmYWQgMzMiIGQ9Ik0zNDQuMDE0LDczOC4wODNsLTIuNzQxLDYuMjY0YTMuMDUyLDMuMDUyLDAsMCwwLC41ODEsMy4zODMsNy45NzMsNy45NzMsMCwwLDAsMy4yMjYsMS45NzIsMjAuMzcyLDIwLjM3MiwwLDAsMCw4Ljc2NC42MTZjMi45My0uMzA3LDUuODMzLS44OTUsOC43ODktMS4xLDYuNy0uNDQ3LDEzLjEsMS41OTQsMTkuNywyLjE4MmE1OC41LDU4LjUsMCwwLDAsMTkuMjY5LTEuNDEyYzYuMDIxLTEuNDU0LDEyLjk2Mi0zLjUsMTYuMS05LjgxNWExOC44LDE4LjgsMCwwLDAsMS40NjUtNi41NTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNDEuMDAyIC03MTEuMjM5KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA2MGQ2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgICA8cGF0aCBpZD0iUGZhZF8zNCIgZGF0YS1uYW1lPSJQZmFkIDM0IiBkPSJNMzcxLjUwNyw3MjQuMzQ1YTIxLjExNSwyMS4xMTUsMCwwLDAsNC43ODQtMy44OTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzkuMjQgLTcxNS44MTQpIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MDYwZDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzM1IiBkYXRhLW5hbWU9IlBmYWQgMzUiIGQ9Ik0zNjYuOTQ3LDcyNy43NTJhMjcuNTE2LDI3LjUxNiwwLDAsMCw0Ljc0NC0zLjY1MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyOC40OTQgLTcxNC41NDUpIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MDYwZDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICAgIDxwYXRoIGlkPSJQZmFkXzM2IiBkYXRhLW5hbWU9IlBmYWQgMzYiIGQ9Ik0zNjYuMTg2LDcyNi45NWEyNC4yNzksMjQuMjc5LDAsMCwxLTMuNjM5LDMuOTQ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzE3LjA2IC03MTMuNTU0KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjA2MGQ2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPC9nPgo8L3N2Zz4K',
                      },
                    },
                    percent: {
                      color: '#8800FF',
                      align: 'left',
                      padding: [10, 0, 0, 0],
                      fontWeight: 'bold',
                      fontSize: 18,
                    },
                    name: {
                      color: 'darkblue',
                      // align: 'center',
                      padding: [0, 0, 0, 50],
                    },
                  },
                },
              },
            ],
            color: colors,
          },
        ],
      }}
    />
  )
}
