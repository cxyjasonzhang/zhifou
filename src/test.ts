// 测试数据

export interface ImageProps {
  _id?: string;
  url?: string;
  fitUrl?: string;
  createdAt?: string;
}

// 文章数据的类型
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createAt: string;
  columnId: number
}

export interface ColumProps {
  _id: number;
  title: string;
  avatar?: ImageProps;
  description: string
}

// 专栏数据
export const testData: ColumProps[] = [
  {
    _id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: {
      url:''
    }
  },{
    _id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: {
      url:''
    }
  },{
    _id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: {
      url:'https://ts1.cn.mm.bing.net/th/id/R-C.d8768f20526dbe935df75a72583691c7?rik=tOmn7hUsfJUB3w&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201912%2f24%2f1577202207380271.jpg&ehk=mH8mhcNRaVsEjjxtJ86Qpg5a8ZZe5%2bcv1cxcVYMGuVw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    }
  },{
    _id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: {
      url:'https://ts1.cn.mm.bing.net/th/id/R-C.d8768f20526dbe935df75a72583691c7?rik=tOmn7hUsfJUB3w&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201912%2f24%2f1577202207380271.jpg&ehk=mH8mhcNRaVsEjjxtJ86Qpg5a8ZZe5%2bcv1cxcVYMGuVw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'
    }
  }
]
// 文章数据
export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '第一篇文章',
    content: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    createAt:'2011-09-09 10:30:55',
    columnId: 1
  },
  {
    id: 2,
    title: '第一篇文章',
    content: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    createAt:'2011-09-29 10:30:55',
    columnId: 2
  },
  {
    id: 3,
    title: '第一篇文章',
    content: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    createAt:'2011-09-19 10:30:55',
    columnId: 3
  },
  {
    id: 4,
    title: '第一篇文章',
    content: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    createAt:'2011-19-29 10:30:55',
    columnId: 4
  },
  {
    id: 5,
    title: '第一篇文章',
    content: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
    createAt:'2019-09-09 10:39:55',
    columnId: 5
  }
]