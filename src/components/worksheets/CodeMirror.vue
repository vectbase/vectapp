
<template>
  <div id="abc">
    <codemirror
      ref="cm"
      v-model="code"
      :options="cmOptions"
      @input="inputChange"
    ></codemirror>
  </div>
</template>

<script>
// 取消eslint 代码style 检查
/* eslint-disable */

  // 全局引入vue-codemirror
import {codemirror} from 'vue-codemirror'
// 引入css文件
import 'codemirror/lib/codemirror.css'
// 引入语言模式 可以从 codemirror/mode/ 下引入多个
import 'codemirror/mode/sql/sql.js'

// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'

// 高亮行功能
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'

// 自动括号匹配功能
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/display/placeholder'

// 显示自动刷新
import 'codemirror/addon/display/autorefresh'

import 'codemirror/addon/search/match-highlighter'
// 引入主题 可以从 codemirror/theme/ 下引入多个
// import 'codemirror/theme/xq-light.css'
import 'codemirror/theme/neo.css'

import $ from 'jquery'
import {mapState} from 'vuex'

export default {
  name: 'CodeMirror',
  components: {
    codemirror
  },
  beforeMount: async function () {
    // $(document).delegate('.CodeMirror-hint-active .autocomplete-hint',hover)

    // let keys = await this.services.workSheetService.generateCodeMirSets()
    // if (keys && keys.length > 0) {
    //   this.dataSets.concat(keys)
    // }

    // get tables
  },
  props: ['initSql'],
  data () {
    return {
      code: this.initSql,
      selectSql: '',
      cmOptions: {
        // 语言及语法模式
        mode: 'text/x-sql',
        // 主题
        theme: 'neo',
        // 显示函数
        line: true,
        lineNumbers: true,
        // 软换行
        lineWrapping: true,
        placeholder: 'select * from demo_db.demo_table',
        // tab宽度
        tabSize: 4,
        select: function (completion, e) {
          console.log('回调了啊', completion, e)
        },
        hintOptions: {
          completeSingle: false,
          hint: this.handleShowHint2,
          pick: function (e) {
            console.log('回调:', e)
          }
        },
        // 高亮行功能
        styleActiveLine: true,
        autoRefresh: true,
        onCursorActivity: function () {
          console.info('wo xuanzhongle ')
        }
      },
      dataSets: [
        {
          id: 'sql_1',
          parent: 0,
          text: 'select',
          displayText: 'select',
          displayInfo: 'keyword'
        },
        {
          id: 'sql_2',
          parent: 0,
          text: 'where',
          displayText: 'where',
          displayInfo: 'keyword'
        },
        {
          id: 'sql_3',
          parent: 0,
          text: 'from',
          displayText: 'from',
          displayInfo: 'keyword'
        },
        {
          id: 'sql_4',
          parent: 0,
          text: 'use',
          displayText: 'use',
          displayInfo: 'keyword'
        },
        {
          id: 'sql_5',
          parent: 0,
          text: 'show',
          displayText: 'show',
          displayInfo: 'keyword'
        },
        {
          id: 'sql_6',
          parent: 0,
          text: 'table',
          displayText: 'table',
          displayInfo: 'keyword'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'services'
    ])
  },
  methods: {
    inputChange (content) {
      this.$nextTick(() => {
        this.code = content
      })
    },
    updateDefaultSql: function (data) {
      this.code = data
    },
    changeKeys: function (data) {// 初始化数据库数据
      if (data && data.length > 0) {
        for (let item of data) {
          let t = {
            id: item.id,
            parent: 0,
            text: item.name,
            displayText: item.name,
            displayInfo: 'database'
          }
          this.dataSets.push(t)
        }
      }
    },
    changeDb: function (data, dbid) {//根据db来添加table
      if (data && data.length > 0) {
        // 去掉已存在的别的table
        let newDs = []
        for (let tmp of this.dataSets) {
          if (tmp.displayInfo !== 'table') {
            newDs.push(tmp)
          }
        }
        for (let item of data) {
          let t = {
            id: item.id,
            parent: dbid,
            text: item.name,
            displayText: item.name,
            displayInfo: 'table'
          }
          newDs.push(t)
        }
        this.dataSets = newDs
      }
    },
    getSql () {
      // ge
      return this.selectSql || this.code
    },
    setTabName (val) {
      // s
      let pos1 = this.$refs.cm.codemirror.getCursor()
      let pos2 = {}
      pos2.line = pos1.line
      pos2.ch = pos1.ch
      this.$refs.cm.codemirror.replaceRange(val, pos2)
    },
    changeSql (sql) {
      this.code = sql
    },
    handleShowHint (cmInstance, hintOptions) {
      let cursor = cmInstance.getCursor()
      let cursorLine = cmInstance.getLine(cursor.line)
      let end = cursor.ch
      // let start = end

      let token = cmInstance.getTokenAt(cursor)
      console.log(cmInstance, cursor, cursorLine, end, token)
      // console.log(hintOptions.tables)
      // return hintOptions.tables;
      return {
        list: ['hello', 'world'],
        from: {ch: token.start, line: cursor.line},
        to: {ch: token.end, line: cursor.line}
      }
    },
    handleShowHint2 (cmInstance, hintOptions) {
      let cursor = cmInstance.getCursor()
      let cursorLine = cmInstance.getLine(cursor.line)
      let end = cursor.ch
      let start = end

      let token = cmInstance.getTokenAt(cursor)
      const sourcelist = this.dataSets.map(val => {
        val.render = this.hintRender
        return val
      })
      let reslist = []
      let flag = 0
      if (token.string.trim() !== '') {
        if (token.string.trim().endsWith('.')) {
          flag = 1
          // 级联提示
          // select * from snowflake_sample_data.tpcds_sf100tcl
          //
          // select from snowflake_sample_data.
          console.log(' 级联：', token)
          if (cursorLine.trim() === '.') {
            reslist = sourcelist
          } else {
            // eslint-disable-next-line no-unused-vars
            let preKey = ''
            let cline = cursorLine.trim().substring(0, cursorLine.length - 1)
            console.log('cline', cline)
            if (cline.indexOf('.') > -1) {
              preKey = cline.substr(cline.indexOf('.') + 1)
              console.log('preKey0=', preKey)
            } else {
              // 根据空格来截取区分
              preKey = cursorLine.substring(cursorLine.lastIndexOf(' ') + 1, cursorLine.length - 1).trim()
              console.log('preKey1=', preKey)
            }
            if (preKey !== '') {
              let tarr = sourcelist.filter(item => (item.text === preKey))
              console.log('tarr', tarr)
              if (tarr.length > 0) {
                var pNode = tarr[0]
                if (tarr.length > 1) {
                  // 根据级别来判断
                  var lev = 1
                  if (cline.indexOf('.') > -1) {
                    lev = 2
                  }
                  for (let i = 0; i < tarr.length; i++) {
                    var tmp = tarr[i]
                    if (lev === 1 && tmp.displayInfo === 'database') {
                      pNode = tmp
                      break
                    }
                    if (lev === 2 && tmp.displayInfo === 'schema') {
                      pNode = tmp
                      break
                    }
                  }
                }
                reslist = sourcelist.filter(function (item) {
                  console.log('内容：', item.parent, pNode.id)
                  return item.parent === pNode.id
                })
                console.log('rrr:', reslist)
              }
            }
          }
        } else {
          reslist = sourcelist.filter(item => (item.text.startsWith(token.string)))
        }
      }
      return {
        list: reslist,
        from: {ch: flag === 0 ? token.start : token.start + 1, line: cursor.line},
        to: {ch: token.end, line: cursor.line}
      }
    },
    hintRender (element, self, data) {
      let div = document.createElement('div')
      div.setAttribute('class', 'autocomplete-div')
      div.onclick = function (e) {
        console.log('clicked a..', e)
      }
      $(element).width(200)
      // if ($(element).hasClass('CodeMirror-hint-active')) { todo keyword color
      //   $(element).removeClass('CodeMirror-hint-active')
      //   $(element).addClass('code-active')
      // }
      let divText = document.createElement('div')
      divText.setAttribute('class', 'autocomplete-name')
      divText.innerText = data.displayText

      let divInfo = document.createElement('div')
      divInfo.setAttribute('class', 'autocomplete-hint')
      divInfo.innerText = data.displayInfo

      div.appendChild(divText)
      div.appendChild(divInfo)
      element.appendChild(div)
      console.info('element:', element)
    }
  },
  mounted () {
    // 代码提示功能 当用户有输入时，显示提示信息
    this.$refs.cm.codemirror.on('inputRead', cm => {
      cm.showHint()
      var completion = cm.state.completionActive
      var pick = completion.pick
      completion.pick = function (data, i) {
        pick.apply(this, arguments)
      }
    })
    this.$refs.cm.codemirror.on('cursorActivity', cm => {
      this.selectSql = cm.getSelection()
    })
    $('.CodeMirror-code').css('text-align', 'left')
  }
}
</script>

<style>
.CodeMirror pre.CodeMirror-placeholder{
  color: #999;
}
.autocomplete-div {
  /*display: inline-block;*/
  height: 35px;
  width: 100px;
  margin-top: 3px;
  margin-bottom: 3px;
  /*background-color: #EEEEEE;*/
}
.autocomplete-name {
  /*display: inline-block;*/
  font-size: 16px;
}
.autocomplete-hint {
  /*display: inline-block;*/
  /*float: right;*/
  /*color: white;*/
  /*margin-left: 1em;*/
  font-size: 12px;
  /*color: gray;*/

}
.code-active{
  border-left: 1px solid #0a58ca;
}
.cc{
  color: red;
}
.CodeMirror-cursor {
  border-left: 1px solid black!important;
  width:0!important;
}
/*.cc >>>.cm-keyword {*/
/*  color: #F08047;*/
/*}*/
</style>
<style scoped>
.CodeMirror-hint-active{
  background: #fff;
  border-color: #e2e3e5;
  border-left-color: #1a6ce7;
}
</style>
