export const delyTime=(async(time)=>{

    await new Promise((resolve)=>{
        setTimeout(()=>{
             resolve()
        },time)

    })

})