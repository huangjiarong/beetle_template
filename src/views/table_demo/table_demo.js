// import { getAccount } from '@/api/account'

const defaultTemp = {
  id: undefined,
  username: '',
  password: '',
  checkPassword: '',
  real_name: undefined,
  email: undefined,
  telephone: undefined,
  is_active: true,
  edit: false
}

const defaultListQuery = {
  page: 1,
  limit: 10,
  ordering: 'id',
  username: undefined,
  telephone: undefined,
  is_active: undefined,
  realname: undefined,
  roles: undefined
}

let that

export default {
  filters: {
    titleFilter(target) {
      for (var i = 0; i < that.targets.length; ++i) {
        if (that.targets[i].id === target) {
          return that.targets[i].title
        }
      }
    },
    descFilter(target) {
      for (var i = 0; i < that.targets.length; ++i) {
        if (that.targets[i].id === target) {
          return that.targets[i].desc
        }
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      table1: [],
      table2: [],
      table3: [],
      targets: [],
      table1Edit: false,
      table2Edit: false,
      table3Edit: false,
      showOperation: true, // 打印pdf时隐藏操作列
      listQuery: Object.assign({}, defaultListQuery),
      temp: Object.assign({}, defaultTemp)
    }
  },
  beforeCreate() {
    that = this
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTable1()
      this.getTable2()
      this.getTable3()
    },

    getTable1() {
      this.table1 = [
        {
          col1: { name: '课程名称: ', value: '程序设计基础' },
          col2: { name: '课程内容(必修/选修): ', value: '必修' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '课程英文名称: ', value: 'Fundamentals of Programming' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '总学时/周学时/学分: ', value: '80/6/5.0' },
          col2: { name: '其中实验/实践学时', value: '20' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '先修课程: ', value: '计算机导论' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '后续课程支撑: ', value: '算法与数据结构、算法设计与分析' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '授课时间: ', value: '周一3-4;周二3-4;周五3-4' },
          col2: { name: '授课地点: ', value: '周一、周三: 7B205; 周五: 7A207' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '授课对象: ', value: '2020级计算机类2班' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '开课学院: ', value: '计算机科学与技术' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '任课教师姓名/职称: ', value: '冯能山/副教授' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '答疑时间、地点与方式: ', value: '1.每次上课的课前、课间和课后，采用一对一的问答方式。\n2.每次习题课，采用集中讲解方式。\n3.通过 QQ，网上答疑系统及电话答疑，时间地点不限。' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'textarea'
        },
        {
          col1: { name: '课程考核方式: ', value: '闭卷' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'text'
        },
        {
          col1: { name: '使用教材: ', value: '(1)C语言程序设计(第五版), 谭浩强, 清华大学出版社, 2017年8月.' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'textarea'
        },
        {
          col1: { name: '教学参考资料: ', value: '(1)C语言程序设计(第五版), 谭浩强, 清华大学出版色, 2017年8月.\n(2)C语言程序设计(第一版), 肖捷、侯家利, 中国铁道出版社, 2016年1月.' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'textarea'
        },
        {
          // eslint-disable-next-line no-multi-str
          col1: { name: '课程简介: ', value: '《程序设计基础》是高等学校计算机类专业一门重要的专业基础课程，它以编程语言（C 语言）为平台，介绍程序设计的思想和方法，培养学生基础编程能力，包括：语言知识、程序阅读分析、程序模仿改写、独立编程、以及程序调试等方面的能力。C 语言是一门应用广泛的程序设计语言，既具有高级语言的特性，又具有直接操纵计算机硬件的能力，并因其具有丰富灵活的控制和数据结构、简洁而高效的语句表达、清晰的程序结构和良好的可移植性而拥有大量的用户。目前，C 语言被许多高等学校列为计算机类专业程序设计课程的首选语言，程序设计基础是后续专业课程学习的重要基础，被定义为我校计算机类专业的核心基础课程。' },
          col2: { name: '', value: '' },
          edit: false,
          type: 'textarea'
        }
      ]
    },

    // 表格一合并方法
    table1SpanMethod({ row, column, rowIndex, columnIndex }) {
      const arr = [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13]
      if (arr.includes(rowIndex)) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },

    // 点击table1的编辑事件
    handleTable1Edit() {
      for (var i = 0; i < this.table1.length; i++) {
        if (this.table1[i].edit === false) {
          this.table1[i].edit = true
        }
      }
      this.table1Edit = true
    },

    // 保存table1数据
    saveTable1() {
      for (var i = 0; i < this.table1.length; i++) {
        if (this.table1[i].edit === true) {
          this.table1[i].edit = false
        }
      }
      this.table1Edit = false
    },

    table1Pdf() {
      // const routeData = this.$router.resolve({
      //   path: '/download_pdf',
      //   query: { param: table1 }
      // })
      // console.log(routeData)
      // window.open(routeData.href, '_blank')

      // var title = table2.getElementsByTagName('thead')[0].lastChild // 获取表格的表头
      // title.removeChild(title.lastChild) // 删除操作列
      // var rows = table2.getElementsByTagName('tbody')[0].childNodes // 获取每行数据
      // for (var i = 0; i < rows.length - 1; i++) {
      //   var child = rows[i]
      //   child.removeChild(child.lastChild)
      // }
      this.showOperation = false
      const table1 = document.getElementById('table1').innerHTML
      var table2 = document.getElementById('table2')
      console.log(table2)
      this.$nextTick(() => {
        this.$router.push({
          path: '/download_pdf',
          query: { table1: table1, table2: table2.outerHTML }
        })
      })
    },

    getTable2() {
      this.table2 = [
        {
          id: 1,
          edit: false,
          courseTarget: {
            'title': '目标一(知识目标):',
            'desc': '通过该课程的学习，学生不仅要掌握 C 程序设计语言的语言知识，更重要的是在实践中逐步掌握程序设计的基本思想和方法，培养问题求解和语言的应用能力，为后续课程打好基础。'
          },
          indexPoint: '3-3：能够理解工程开发和设计过程中的社会、健康、安全、法律法规、工程伦理等因素。\n3-4：能够使用报告或实物等形式，呈现计算机软、硬件及系统设计成果。',
          requirments: '3 设计/开发解决方案：具备综合运用基础理论和技术手段分析并解决计算机工程问题的能力，包括程序设计与实现能力、硬件系统设计与实现能力、软件系统设计与实现能力、算法分析与设计能力、软硬件系统综合设计与实现能力、应用系统设计与管理能力。'
        },
        {
          id: 2,
          edit: false,
          courseTarget: {
            'title': '目标一(知识目标):',
            'desc': '通过该课程的学习，学生不仅要掌握 C 程序设计语言的语言知识，更重要的是在实践中逐步掌握程序设计的基本思想和方法，培养问题求解和语言的应用能力，为后续课程打好基础。'
          },
          indexPoint: '3-3：能够理解工程开发和设计过程中的社会、健康、安全、法律法规、工程伦理等因素。\n3-4：能够使用报告或实物等形式，呈现计算机软、硬件及系统设计成果。',
          requirments: '3 设计/开发解决方案：具备综合运用基础理论和技术手段分析并解决计算机工程问题的能力，包括程序设计与实现能力、硬件系统设计与实现能力、软件系统设计与实现能力、算法分析与设计能力、软硬件系统综合设计与实现能力、应用系统设计与管理能力。'
        },
        {
          id: 3,
          edit: false,
          courseTarget: {
            'title': '目标一(知识目标):',
            'desc': '通过该课程的学习，学生不仅要掌握 C 程序设计语言的语言知识，更重要的是在实践中逐步掌握程序设计的基本思想和方法，培养问题求解和语言的应用能力，为后续课程打好基础。'
          },
          indexPoint: '3-3：能够理解工程开发和设计过程中的社会、健康、安全、法律法规、工程伦理等因素。\n3-4：能够使用报告或实物等形式，呈现计算机软、硬件及系统设计成果。',
          requirments: '3 设计/开发解决方案：具备综合运用基础理论和技术手段分析并解决计算机工程问题的能力，包括程序设计与实现能力、硬件系统设计与实现能力、软件系统设计与实现能力、算法分析与设计能力、软硬件系统综合设计与实现能力、应用系统设计与管理能力。'
        }
      ]
    },

    // table2添加一行数据
    addTable2NewLine() {
      this.table2.push({
        id: this.table2[this.table2.length - 1].id + 1,
        'requirments': '',
        'indexPoint': '',
        'courseTarget': { 'title': '', 'desc': '' },
        'edit': true
      })
      this.table2Edit = true
    },

    // 点击table1的编辑事件
    handleTable2Edit() {
      for (var i = 0; i < this.table2.length; i++) {
        if (this.table2[i].edit === false) {
          this.table2[i].edit = true
        }
      }
      this.table2Edit = !this.table2Edit
    },

    // 保存table2数据
    saveTable2() {
      for (var i = 0; i < this.table2.length; i++) {
        if (this.table2[i].edit === true) {
          this.table2[i].edit = false
        }
      }
      this.table2Edit = !this.table2Edit
    },

    // table2 删除事件
    deleteTable2(row, index) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.table2.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    getTable3() {
      this.targets = [
        {
          id: 1,
          title: '目标一(知识目标)',
          desc: '返回第六十九风刀霜剑咖啡但是人家鄂温克肌肤'
        },
        {
          id: 2,
          title: '目标2',
          desc: 'fdsjfhdsahfdksljfkdsjafhdslajfj'
        },
        {
          id: 3,
          title: '目标3',
          desc: '返回第六fdsahfdlsjafldksja十九风刀霜剑咖啡但是人家鄂温克肌肤'
        }
      ]
      this.table3 = [
        {
          edit: false,
          id: 1,
          target: 1,
          content: '1. 算法及描述。\n2. 实现问题求解过程。\n3. 算法表示方法。\n4.模块化程序设计方法。\n5.变量、内存单元、地址间关系。\n6.指向二维数组指针。',
          works: 3,
          experiment: 6,
          exam: 21,
          weight: 30
        },
        {
          edit: false,
          id: 2,
          target: 2,
          content: '1. 算法及描述。\n2. 实现问题求解过程。\n3. 算法表示方法。\n4.模块化程序设计方法。\n5.变量、内存单元、地址间关系。\n6.指向二维数组指针。',
          works: 3,
          experiment: 6,
          exam: 21,
          weight: 30
        }
      ]
      // 计算合计行
      var sum_works = 0
      var sum_experiment = 0
      var sum_exam = 0
      var sum_weight = 0
      for (var i = 0; i < this.table3.length; i++) {
        sum_works += this.table3[i].works
        sum_experiment += this.table3[i].experiment
        sum_exam += this.table3[i].exam
        sum_weight += this.table3[i].weight
        this.table3[i].index = i + 1
      }
      this.table3.push({
        id: 0,
        edit: false,
        index: '合计',
        works: sum_works,
        experiment: sum_experiment,
        exam: sum_exam,
        weight: sum_weight
      })
      this.table3.push({
        id: -1,
        edit: false,
        index: '注：各类考核评价的具体评分标准见《附录：各类考核评分标准表》'
      })
      this.table3.push({
        id: -2,
        edit: false,
        index: '大纲编写时间：2020 年 9 月 2 日'
      })
      this.table3.push({
        id: -3,
        edit: false,
        index: '大纲编写时间：2020 年 9 月 2 日'
      })
    },

    // table3的合并方法
    table3SpanMethod({ row, column, rowIndex, columnIndex }) {
      // 找到合计行
      if (row.id === 0) {
        if (columnIndex === 0) {
          return [1, 3]
        } else if (columnIndex === 1) {
          return [0, 0]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      }
      // 找到合计行后面的行
      if (row.id < 0) {
        if (columnIndex === 0) {
          return [1, 8]
        } else {
          return [0, 0]
        }
      }
    },

    // 点击table3的编辑事件
    handleTable3Edit() {
      for (var i = 0; i < this.table3.length; i++) {
        if (this.table3[i].edit === false) {
          this.table3[i].edit = true
        }
      }
      this.table3Edit = !this.table3Edit
    }

  }
}
