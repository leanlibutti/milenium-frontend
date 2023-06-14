import styled from 'styled-components'
import { GrDocumentPdf } from 'react-icons/gr'
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib'

import logo from '../assets/logo.png'
import seal from '../assets/payment-seal.png'
import { Colors } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'

const { primaryBlue, secondaryBlue, colorText } = Colors

export const BillItem = ({ bill, user, months }) => {
  const month = months.find((m) => m.value === bill.month).month

  /* useEffect(() => {
    if (user) {
      const newDoc = (
        <Document>
          <Page
            size="A5"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                textAlign: 'center',
                backgroundColor: 'white',
                padding: 1
              }}
            >
              <Image
                src={logo}
                alt="random image"
                style={{ maxWidth: '150px', maxHeight: 'auto', top: '-10vw' }}
              />
              <Text
                style={{
                  color: `${primaryBlue}`,
                  fontSize: '36px',
                  alignItems: 'center',
                  margin: 'auto auto 10vw auto',
                  fontWeight: 'bold'
                }}
              >
                Pago {month} - {bill.year}
              </Text>

              <Text style={{ textAlign: 'justify', marginTop: '30px' }}>
                Usuario: {user.username} {user.surname}.
              </Text>
              <Text style={{ textAlign: 'justify', marginTop: '30px' }}>
                Email: {user.email}.
              </Text>
              <Text style={{ textAlign: 'justify', marginTop: '30px' }}>
                Fecha: {bill.day} de {month} del {bill.year}.
              </Text>
              <Text style={{ textAlign: 'justify', marginTop: '30px' }}>
                Monto: ${bill.mount}.
              </Text>
              <Image
                src={seal}
                alt="random image"
                style={{
                  maxWidth: '120px',
                  maxHeight: '120px',
                  marginLeft: '60%',
                  top: '10vw',
                  transform: 'rotate(-15)'
                }}
              />
            </View>
          </Page>
        </Document>
      )
      setDoc(newDoc)
    }
  }, [user, bill, month]) */

  async function createPDFWithReactPDF() {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage()

    const { width, height } = page.getSize()

    const logoBytes = await fetch(logo).then((response) =>
      response.arrayBuffer()
    )
    const sealBytes = await fetch(seal).then((response) =>
      response.arrayBuffer()
    )

    const logoImage = await pdfDoc.embedPng(logoBytes)
    const sealImage = await pdfDoc.embedPng(sealBytes)

    const logoWidth = 272
    const logoHeight = 70

    const sealWidth = 120
    const sealHeight = 120

    page.drawImage(logoImage, {
      x: width / 2 - logoWidth / 2,
      y: height - 100,
      width: logoWidth,
      height: logoHeight
    })

    page.drawText(`Pago ${month} - ${bill.year}`, {
      x: 50,
      y: height - 200,
      size: 32,
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
      color: rgb(0, 0, 1)
    })

    page.drawText(`Usuario: ${user.username} ${user.surname}.`, {
      x: 60,
      y: height - 300,
      size: 18,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0)
    })

    page.drawText(`Email: ${user.email}.`, {
      x: 60,
      y: height - 370,
      size: 18,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0)
    })

    page.drawText(`Fecha: ${bill.day} de ${month} del ${bill.year}.`, {
      x: 60,
      y: height - 440,
      size: 18,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0)
    })

    page.drawText(`Monto: $${bill.mount}.`, {
      x: 60,
      y: height - 510,
      size: 18,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0)
    })

    page.drawImage(sealImage, {
      x: width - sealWidth - 50,
      y: 50,
      width: sealWidth,
      height: sealHeight,
      rotate: degrees(-15)
    })

    const pdfBytes = await pdfDoc.save()

    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${user.username} ${user.surname} - ${bill.month} ${bill.year}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Container>
      <BillItemContainer>
        <Namebill>
          <GrDocumentPdf size="1.5rem" />
          Pago {month} - {bill.year}
        </Namebill>
        <BillButton type="button" onClick={createPDFWithReactPDF}>
          Descargar PDF
        </BillButton>
      </BillItemContainer>
    </Container>
  )
}

const BillButton = styled.button`
  font-family: ${FontFamily};
  background-color: ${primaryBlue};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.3rem;
  padding: 10px 20px;
  margin: 1vw 1vw 1vw 0;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 980px) {
    font-size: 0.9rem;
  }

  :hover {
    cursor: pointer;
    background-color: ${secondaryBlue};
  }
`

const BillItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colorText};
  margin: 2vw 5vw 1vw 5vw;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px #ccc;

  @media screen and (max-width: 480px) {
    margin: 8vw 1vw 5vw 1vw;
  }
`

const Container = styled.div``

const Namebill = styled.p`
  font-size: 1.3rem;

  @media screen and (max-width: 800px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`
