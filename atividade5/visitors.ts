interface IVisitor{
    visitReportA(report: ReportA):any
    visitReportB(report: ReportB):any
    visitReportC(report: ReportC):any
}
interface IReport{
    accept(v:IVisitor):any
}
class ReportA implements IReport{
    accept(v: IVisitor) {
        v.visitReportA(this)
    }
}
class ReportB implements IReport{
    accept(v: IVisitor) {
        v.visitReportB(this)
    }
}
class ReportC implements IReport{
    accept(v: IVisitor) {
        v.visitReportC(this)
    }
}

class HTMLVisitor implements IVisitor{
    visitReportA(report: ReportA){ console.log("Returning HTML for Report A")}
    visitReportB(report: ReportB){ console.log("Returning HTML for Report B")} 
    visitReportC(report: ReportC){ console.log("Returning HTML for Report C")}
}
class JSONVisitor implements IVisitor{
    visitReportA(report: ReportA){ console.log("Returning JSON for Report A")}
    visitReportB(report: ReportB){ console.log("Returning JSON for Report B")} 
    visitReportC(report: ReportC){ console.log("Returning JSON for Report C")}   
}

function main(){
    const reports = [ new ReportA, new ReportB, new ReportC]
    const jsonVisitor =  new JSONVisitor
    const htmlVisitor =  new HTMLVisitor
    reports.forEach(report => {
        report.accept(jsonVisitor)
        report.accept(htmlVisitor)
    })
}
main()