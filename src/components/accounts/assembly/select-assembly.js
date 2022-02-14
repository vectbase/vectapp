// noinspection JSAnnotator
export const selectAssemblyJs = {
  commonHandleChecked (constList, labelList, selectObj) {
    if (selectObj.id === 0) {
      constList.forEach(obj => {
        obj.checked = false
      })
      constList[0].checked = true
      labelList = []
    } else {
      if (this.isSelectedAll(constList)) {
        constList.forEach(obj => {
          obj.checked = false
        })
        constList[0].checked = true
        labelList = []
      } else {
        constList[0].checked = false
        selectObj.checked = !selectObj.checked
        if (this.isSelectedAll(constList) || this.isSelectedNone(constList)) {
          constList.forEach(obj => {
            obj.checked = false
          })
          constList[0].checked = true
          labelList = []
        } else {
          if (selectObj.checked) {
            if (labelList.indexOf(selectObj.id) < 0) {
              labelList.push(selectObj.id)
            }
          } else {
            labelList = labelList.filter(objId => {
              return objId !== selectObj.id
            })
          }
        }
      }
    }
  },
  handleSelectClose (constList, labelList) {
    labelList = []
    constList.forEach(obj => {
      obj.checked = false
    })
    constList[0].checked = true
  },
  isSelectedAll (dataList) {
    return dataList.filter(obj => {
      return obj.id !== 0
    }).filter(obj => {
      return obj.checked
    }).length === dataList.length - 1
  },
  isSelectedNone (dataList) {
    return dataList.filter(status => {
      return status.id !== 0
    }).filter(status => {
      return status.checked
    }).length === 0
  }
}
